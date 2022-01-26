import useEvents from './hooks/useEvents';
import styled from 'styled-components';
import EventCard from './components/EventCard';

const Container = styled.div`
    padding: 8px 12px;
`;

function App() {
    const events = useEvents();
    return (
        <Container>
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </Container>
    );
}

export default App;
