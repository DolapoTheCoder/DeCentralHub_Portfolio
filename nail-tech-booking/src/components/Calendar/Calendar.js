import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Calendar({ bookings }) {
    const events = bookings.map(booking => ({
        start: new Date(`${booking.date}T${booking.time}`),
        end: new Date(`${booking.date}T${booking.time}`),
        title: `${booking.name} - ${booking.service}`,
    }));

    return (
        <div style={{ height: '500px' }}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
            />
        </div>
    );
}

export default Calendar;
