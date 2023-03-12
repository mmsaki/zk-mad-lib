import React from 'react';
import './global.css';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const connect = ReactDOM.createRoot(document.getElementById('connect'));
connect.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
