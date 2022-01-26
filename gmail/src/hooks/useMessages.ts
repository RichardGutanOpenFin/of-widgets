import { useEffect, useState } from "react";
import getMessages, { Message } from "../lib/getMessages";

export default function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const e = await getMessages();
            setMessages(e);
        };
        fetchMessages();

        const interval = setInterval(fetchMessages, 60 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return messages;
}
