import { addDays, format } from './date-fns';

export type Event = { title?: string; start?: string; end?: string; id?: string; link?: string };

const formatTime = (dateTime?: string) => (dateTime ? format(Date.parse(dateTime), 'HH:mm') : '');

export const getEvents = async (): Promise<Event[]> => {
    const calendar = window.gapi?.client?.calendar;
    if (calendar) {
        const {
            result: { items }
        } = await calendar.calendarList.list();

        const now = new Date();
        const { result } = await calendar.events.list({
            calendarId: items?.[0].id || '',
            timeMin: now.toISOString(),
            timeMax: addDays(now, 10).toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        });

        return (
            result.items?.map((event) => ({
                id: event.id,
                title: event.summary,
                start: formatTime(event.start?.dateTime),
                end: formatTime(event.end?.dateTime),
                link: event.htmlLink
            })) || []
        );
    }
    return [];
};
