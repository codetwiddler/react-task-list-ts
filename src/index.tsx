import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//In React 18, ReactDOM.render method is still available,
//but ReactDOM.createRoot is now the recommended approach
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//Previously, this might look like this: ReactDOM.render(
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
