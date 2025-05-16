import React from 'react';

function ReminderManager({ bookings }) {
    const sendReminder = (booking) => {
        // In a real application, this would trigger an API call to send an email or SMS
        alert(`Reminder sent to ${booking.name} for appointment on ${booking.date} at ${booking.time}`);
    };

    return (
        <div className="reminder-manager">
            <h2>Upcoming Appointments</h2>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index}>
                        {booking.name} - {booking.date} {booking.time} - {booking.service}
                        <button onClick={() => sendReminder(booking)}>Send Reminder</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReminderManager;