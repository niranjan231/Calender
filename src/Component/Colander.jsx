import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Colander = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});

    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const startDate = startOfMonth.clone().startOf('week').isoWeekday(1);

    const generateCalendar = () => {
        const day = startDate.clone();
        const calendar = [];

        while (day.isBefore(endOfMonth.clone().endOf('week').isoWeekday(7))) {
            calendar.push(
                Array(7)
                    .fill(0)
                    .map(() => day.add(1, 'day').clone())
            );
        }

        return calendar;
    };

    const isToday = (day) => day.isSame(moment(), 'day');
    const isSelected = (day) => selectedDate && day.isSame(selectedDate, 'day');

    const handlePrevMonth = () => setCurrentDate(currentDate.clone().subtract(1, 'month'));
    const handleNextMonth = () => setCurrentDate(currentDate.clone().add(1, 'month'));
    const handleSelectDate = (day) => setSelectedDate(day);

    const handleEventChange = (e) => {
        if (selectedDate) {
            setEvents({
                ...events,
                [selectedDate.format('YYYY-MM-DD')]: e.target.value,
            });
        }
    };

    const calendar = generateCalendar();

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btn btn-outline-primary" onClick={handlePrevMonth}>&lt;</button>
                <h2 className="fw-bold">{currentDate.format('MMMM YYYY')}</h2>
                <button className="btn btn-outline-primary" onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="row text-center fw-semibold border-bottom pb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div className="col" key={day}>{day}</div>
                ))}
            </div>

            {calendar.map((week, i) => (
                <div className="row text-center" key={i}>
                    {week.map((day, idx) => (
                        <div
                            key={idx}
                            className={`col border p-2 rounded m-1 cursor-pointer
                                ${isToday(day) ? 'bg-primary text-white' : ''}
                                ${isSelected(day) ? 'bg-success text-white' : ''}
                                ${day.month() !== currentDate.month() ? 'text-muted' : ''}
                            `}
                            onClick={() => handleSelectDate(day)}
                            style={{ cursor: 'pointer', minHeight: '50px' }}
                        >
                            {day.date()}
                        </div>
                    ))}
                </div>
            ))}

            {selectedDate && (
                <div className="mt-4">
                    <p className="fw-medium">
                        Selected Date: {selectedDate.format('DD-MM-YYYY')}
                    </p>
                    <textarea
                        placeholder="Add note..."
                        value={events[selectedDate.format('YYYY-MM-DD')] || ''}
                        onChange={handleEventChange}
                        className="form-control mt-2"
                        rows={3}
                    ></textarea>
                    {events[selectedDate.format('YYYY-MM-DD')] && (
                        <p className="mt-2 fst-italic text-secondary">
                            Note: {events[selectedDate.format('YYYY-MM-DD')]}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Colander;
