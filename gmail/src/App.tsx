import useMessages from "./hooks/useMessages";
import MessageRow from "./components/MessageRow";

function App() {
    const messages = useMessages();
    return (
        <>
            {messages.map((msg) => (
                <MessageRow key={msg.id} message={msg} />
            ))}
        </>
    );
}

export default App;
