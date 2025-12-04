import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import { NotificationProvider } from './globalProviders/NotificationProvider';
=======
>>>>>>> 3ae9be817abb6f8cf014c29a765b53e479f6cce7

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <NotificationProvider>
      <App />
    </NotificationProvider>
=======
    <App />
>>>>>>> 3ae9be817abb6f8cf014c29a765b53e479f6cce7
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
