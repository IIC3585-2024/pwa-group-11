import React, { useState } from 'react';
import { saveEvent } from '../services/storageService';

function EventForm({ onAddEvent }) {
    const [eventName, setEventName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { id: Date.now(), name: eventName };
        saveEvent(newEvent);
        setEventName('');
        onAddEvent(newEvent);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
                placeholder="Enter event name"
                required
            />
            <button type="submit">Add Event</button>
        </form>
    );
}

export default EventForm;
