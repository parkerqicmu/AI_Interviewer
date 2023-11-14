import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
<GoogleOAuthProvider clientId="1052692314440-1964crjte1jbd1uihhl9bjunnuah82mj.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);


reportWebVitals();