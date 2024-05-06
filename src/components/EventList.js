import React from 'react';

function EventList({ events }) {
    return (
        <ul>
            {events.map(event => (
                <li key={event.id}>{event.name}</li>
            ))}
        </ul>
    );
}

export default EventList;
