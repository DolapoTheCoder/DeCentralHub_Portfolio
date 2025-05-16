import React from 'react';

function Navigation({ activeTab, setActiveTab }) {
    return (
        <nav className="navigation">
            <ul>
                <li className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>Calendar</li>
                <li className={activeTab === 'booking' ? 'active' : ''} onClick={() => setActiveTab('booking')}>Book Appointment</li>
                <li className={activeTab === 'waitlist' ? 'active' : ''} onClick={() => setActiveTab('waitlist')}>Join Waitlist</li>
                <li className={activeTab === 'preferences' ? 'active' : ''} onClick={() => setActiveTab('preferences')}>Set Preferences</li>
                <li className={activeTab === 'reminders' ? 'active' : ''} onClick={() => setActiveTab('reminders')}>Reminders</li>
            </ul>
        </nav>
    );
}

export default Navigation;