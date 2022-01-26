import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Inter', sans-serif;
        background-color: #111;
    }

    ::-webkit-scrollbar {
        width: 8px;
        border-radius: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #24262b;
    }

    ::-webkit-scrollbar-thumb {
        background: #44474f;
        border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

export default GlobalStyle;
