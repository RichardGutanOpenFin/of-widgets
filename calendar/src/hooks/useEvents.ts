import { useEffect, useState } from 'react';
import { getEvents, Event } from '../lib/calendarEvents';

export default function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const e = await getEvents();
            setEvents(e);
        };
        fetchEvents();
    }, []);

    return events;
}
