from flask import Flask, render_template, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
import string
import logging
from sqlalchemy.exc import SQLAlchemyError

# First create the Flask app
app = Flask(__name__)

# Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///queue.db'
app.config['SECRET_KEY'] = 'secret!'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Then initialize SQLAlchemy with the app
db = SQLAlchemy(app)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Now define your models
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    queue_id = db.Column(db.Integer, db.ForeignKey('queue.id'), nullable=False)
    check_in_time = db.Column(db.DateTime, default=datetime.utcnow)
    estimated_wait_time = db.Column(db.Integer)
    token = db.Column(db.String(6), unique=True, nullable=False)

class Queue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    patients = db.relationship('Patient', backref='queue', lazy=True)

# Then set up Flask-SocketIO
from flask_socketio import SocketIO, emit
socketio = SocketIO(app)

# Define your functions
def generate_token():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

def calculate_wait_time(queue_id):
    try:
        patients = Patient.query.filter_by(queue_id=queue_id).order_by(Patient.check_in_time).all()
        for i, patient in enumerate(patients):
            patient.estimated_wait_time = i * 15  # Assume each patient takes 15 minutes
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Error calculating wait time: {str(e)}")

def emit_queue_update(queue_id):
    try:
        queue = Queue.query.get(queue_id)
        patients = Patient.query.filter_by(queue_id=queue_id).order_by(Patient.check_in_time).all()
        socketio.emit('queue_update', {
            'queue_id': queue_id,
            'queue_name': queue.name,
            'patients': [{"name": p.name, "wait_time": p.estimated_wait_time} for p in patients]
        })
    except SQLAlchemyError as e:
        logger.error(f"Error emitting queue update: {str(e)}")

# Define your routes
@app.route('/add_patient', methods=['POST'])
def add_patient():
    try:
        data = request.json
        token = generate_token()
        new_patient = Patient(name=data['name'], queue_id=data['queue_id'], token=token)
        db.session.add(new_patient)
        db.session.commit()
        calculate_wait_time(data['queue_id'])
        emit_queue_update(data['queue_id'])
        return jsonify({"message": "Patient added successfully", "patient_id": new_patient.id, "token": token})
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Error adding patient: {str(e)}")
        return jsonify({"error": "Failed to add patient"}), 500

@app.route('/queue_status/<int:queue_id>')
def queue_status(queue_id):
    try:
        queue = Queue.query.get_or_404(queue_id)
        patients = Patient.query.filter_by(queue_id=queue_id).order_by(Patient.check_in_time).all()
        return jsonify({
            "queue_name": queue.name,
            "patients": [{"name": p.name, "wait_time": p.estimated_wait_time} for p in patients]
        })
    except SQLAlchemyError as e:
        logger.error(f"Error fetching queue status: {str(e)}")
        return jsonify({"error": "Failed to fetch queue status"}), 500

@app.route('/next_patient/<int:queue_id>')
def next_patient(queue_id):
    try:
        patient = Patient.query.filter_by(queue_id=queue_id).order_by(Patient.check_in_time).first()
        if patient:
            db.session.delete(patient)
            db.session.commit()
            calculate_wait_time(queue_id)
            emit_queue_update(queue_id)
            return jsonify({"message": "Next patient processed", "patient_name": patient.name})
        return jsonify({"message": "No patients in queue"})
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Error processing next patient: {str(e)}")
        return jsonify({"error": "Failed to process next patient"}), 500

@app.route('/patient_status/<token>')
def patient_status(token):
    try:
        patient = Patient.query.filter_by(token=token).first()
        if patient:
            queue_position = Patient.query.filter(Patient.queue_id == patient.queue_id, Patient.check_in_time <= patient.check_in_time).count()
            return jsonify({
                "name": patient.name,
                "queue_name": patient.queue.name,
                "position": queue_position,
                "estimated_wait_time": patient.estimated_wait_time
            })
        return jsonify({"error": "Patient not found"}), 404
    except SQLAlchemyError as e:
        logger.error(f"Error fetching patient status: {str(e)}")
        return jsonify({"error": "Failed to fetch patient status"}), 500

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/staff')
def staff():
    return render_template('staff.html')

# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        try:
            if Queue.query.count() == 0:
                db.session.add(Queue(name="Emergency"))
                db.session.add(Queue(name="General Checkup"))
                db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            logger.error(f"Error initializing queues: {str(e)}")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)