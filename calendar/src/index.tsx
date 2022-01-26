import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import GoogleInitializer from './components/GoogleInitializer';

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <GoogleInitializer>
            <App />
        </GoogleInitializer>
    </React.StrictMode>,
    document.getElementById('root')
);
