import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { getEvents } from './services/storageService';

function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents(getEvents());
    }, []);

    const handleAddEvent = (newEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    return (
        <div>
            <h1>Eventos:</h1>
            <EventForm onAddEvent={handleAddEvent} />
            <EventList events={events} />
        </div>
    );
}

export default App;
