import React, { useState } from 'react';

function Waitlist({ onJoinWaitlist }) {
    const [waitlistEntry, setWaitlistEntry] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        service: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWaitlistEntry(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onJoinWaitlist(waitlistEntry);
        setWaitlistEntry({ name: '', email: '', date: '', time: '', service: '' });
    };

    return (
        <div className="waitlist">
            <h2>Join Waitlist</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={waitlistEntry.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={waitlistEntry.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={waitlistEntry.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={waitlistEntry.time}
                    onChange={handleChange}
                    required
                />
                <select
                    name="service"
                    value={waitlistEntry.service}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Service</option>
                    <option value="manicure">Manicure</option>
                    <option value="pedicure">Pedicure</option>
                    <option value="nail-art">Nail Art</option>
                </select>
                <button type="submit">Join Waitlist</button>
            </form>
        </div>
    );
}

export default Waitlist;
