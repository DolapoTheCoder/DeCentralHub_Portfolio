import React, { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import BookingForm from './components/Booking/BookingForm';
import Waitlist from './components/Waitlist/Waitlist';
import PreferenceForm from './components/Preferences/PreferenceForm';
import ReminderManager from './components/Reminders/ReminderManager';
import Navigation from './components/Navigation/Navigation';
import './App.css';

function App() {
  const [bookings, setBookings] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [activeTab, setActiveTab] = useState('calendar');

  const handleBookingSubmit = (newBooking) => {
    const isDoubleBooked = bookings.some(booking =>
      booking.date === newBooking.date && booking.time === newBooking.time
    );

    if (isDoubleBooked) {
      alert('This time slot is already booked. You can join the waitlist.');
    } else {
      setBookings([...bookings, newBooking]);
      alert('Booking successful!');
    }
  };

  const handleJoinWaitlist = (waitlistEntry) => {
    setWaitlist([...waitlist, waitlistEntry]);
    alert('You have been added to the waitlist. We will notify you if a slot becomes available.');
  };

  const handlePreferenceSubmit = (newPreferences) => {
    setPreferences(newPreferences);
    alert('Your preferences have been saved!');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'calendar':
        return <Calendar bookings={bookings} />;
      case 'booking':
        return <BookingForm onBookingSubmit={handleBookingSubmit} />;
      case 'waitlist':
        return <Waitlist onJoinWaitlist={handleJoinWaitlist} />;
      case 'preferences':
        return <PreferenceForm onPreferenceSubmit={handlePreferenceSubmit} />;
      case 'reminders':
        return <ReminderManager bookings={bookings} />;
      default:
        return <Calendar bookings={bookings} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nail Tech Smart Booking</h1>
      </header>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;