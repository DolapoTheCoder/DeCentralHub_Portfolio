import React, { useState } from 'react';

function RSVPAndAttendance({ gameId }) {
    const [rsvpStatus, setRsvpStatus] = useState('');
    const [attendanceHistory, setAttendanceHistory] = useState([]);

    const handleRSVP = (status) => {
        setRsvpStatus(status);
        console.log(`RSVP for game ${gameId}: ${status}`);
        // Here you would typically send this RSVP to your backend
    };

    const markAttendance = (attended) => {
        const newAttendance = { gameId, attended, date: new Date().toISOString() };
        setAttendanceHistory([...attendanceHistory, newAttendance]);
        console.log(`Attendance for game ${gameId}: ${attended ? 'Present' : 'Absent'}`);
        // Here you would typically send this attendance record to your backend
    };

    return (
        <div>
            <h3>RSVP</h3>
            <button onClick={() => handleRSVP('Going')}>Going</button>
            <button onClick={() => handleRSVP('Maybe')}>Maybe</button>
            <button onClick={() => handleRSVP('Not Going')}>Not Going</button>
            <p>Your RSVP: {rsvpStatus}</p>

            <h3>Mark Attendance</h3>
            <button onClick={() => markAttendance(true)}>Present</button>
            <button onClick={() => markAttendance(false)}>Absent</button>

            <h3>Attendance History</h3>
            <ul>
                {attendanceHistory.map((record, index) => (
                    <li key={index}>
                        Game {record.gameId}: {record.attended ? 'Present' : 'Absent'} on {new Date(record.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RSVPAndAttendance;