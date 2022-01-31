import { useEffect, useState } from "react";
import getMessages, { Message } from "../lib/getMessages";
import * as Notifications from 'openfin-notifications';

export default function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [latestDateReceived, setLatestDateReceived] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
            const msgs = await getMessages();
            setMessages(msgs);
        };
        fetchMessages();

        const interval = setInterval(fetchMessages, 60 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (messages.length) {
            if (!latestDateReceived) {
                setLatestDateReceived(messages[0]?.date)
            } else {
                const newMessages = messages.filter(msg => msg.date > latestDateReceived);

                newMessages.forEach(() => {
                    Notifications.create({ 
                        template: 'markdown',
                        body: messages[0].snippet || '', 
                        title: messages[0].from || '', 
                        category: 'gmail', 
                        icon: 'https://mail.google.com/favicon.ico',  
                    });
                });

                if (newMessages.length) {
                    setLatestDateReceived(newMessages[0].date);
                }
            }
        }
        
    }, [messages])

    return messages;
}
