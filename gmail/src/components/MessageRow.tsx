import { Message } from "../lib/getMessages";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
    border-bottom: 1px solid #24262b;
    padding: 8px 8px;
    cursor: pointer;

    &:hover {
        background-color: #24262b;
    }
`;

const From = styled.div<{ unread: boolean }>`
    color: ${({ unread }) => (unread ? "#fbbc04" : "rgba(255, 255, 255, 0.7)")};
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
`;

const Text = styled.div<{ unread?: boolean }>`
    color: ${({ unread }) => (unread ? "#fbbc04" : "rgba(255, 255, 255, 0.7)")};
    font-size: 12px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
`;

export default function MessageRow({ message }: { message: Message }) {
    const [clicked, setClicked] = useState(false);
    const isUnread = !!message.unread && !clicked;

    const onClick = () => {
        fin.System.openUrlWithBrowser(
            `https://mail.google.com/mail/u/0/#inbox/${message.id}`
        );
        setClicked(true);
    };

    useEffect(() => {
        setClicked(false);
    }, [message]);

    return (
        <Container onClick={onClick}>
            <From unread={isUnread}>{message.from}</From>
            <Text unread={isUnread}>{message.subject}</Text>
            <Text>{message.snippet}</Text>
        </Container>
    );
}
