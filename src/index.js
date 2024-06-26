import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalContextProvider } from './context/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <GlobalContextProvider>
    <App />
    </GlobalContextProvider>
    </>
);

