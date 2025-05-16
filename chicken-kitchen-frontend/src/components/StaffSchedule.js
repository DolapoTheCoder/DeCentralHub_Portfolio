import React, { useState, useEffect } from 'react';

function StaffSchedule() {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        // In a real application, this would be an API call
        const fetchSchedule = () => {
            // Simulating API response
            const mockSchedule = [
                { time: '10:00 - 14:00', staff: 3 },
                { time: '14:00 - 18:00', staff: 4 },
                { time: '18:00 - 22:00', staff: 5 },
            ];
            setSchedule(mockSchedule);
        };

        fetchSchedule();
    }, []);

    return (
        <div className="staff-schedule">
            <h3>Staff Schedule</h3>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Staff Required</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((shift, index) => (
                        <tr key={index}>
                            <td>{shift.time}</td>
                            <td>{shift.staff}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StaffSchedule;