import React, { useState } from 'react';

function BookingForm({ onBookingSubmit }) {
    const [booking, setBooking] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        service: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onBookingSubmit(booking);
        setBooking({ name: '', email: '', date: '', time: '', service: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book an Appointment</h2>
            <input
                type="text"
                name="name"
                value={booking.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
            />
            <input
                type="email"
                name="email"
                value={booking.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
            />
            <input
                type="date"
                name="date"
                value={booking.date}
                onChange={handleChange}
                required
            />
            <input
                type="time"
                name="time"
                value={booking.time}
                onChange={handleChange}
                required
            />
            <select
                name="service"
                value={booking.service}
                onChange={handleChange}
                required
            >
                <option value="">Select a Service</option>
                <option value="manicure">Manicure</option>
                <option value="pedicure">Pedicure</option>
                <option value="nail-art">Nail Art</option>
            </select>
            <button type="submit">Book Appointment</button>
        </form>
    );
}

export default BookingForm;
