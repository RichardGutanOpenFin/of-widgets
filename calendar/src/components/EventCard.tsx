import styled from 'styled-components';
import { Event } from '../lib/calendarEvents';

const Container = styled.div`
    border-radius: 4px;
    background-color: #24262b;
    margin-bottom: 8px;
    padding: 8px 8px;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
        background-color: #2b2d30;
    }
`;

const Title = styled.div`
    display: block;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 2px;
`;

const Content = styled.div`
    display: block;
    color: #fff;
    font-size: 12px;
`;

export default function EventCard({ event }: { event: Event }) {
    const onClick = () => {
        if (event.link) {
            fin.System.openUrlWithBrowser(event.link);
        }
    };
    return (
        <Container onClick={onClick}>
            <Title>{event.title}</Title>
            <Content>
                {event.start}-{event.end}
            </Content>
        </Container>
    );
}
