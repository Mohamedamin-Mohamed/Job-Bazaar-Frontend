import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import {GoogleOAuthProvider} from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={"488140599212-l1llbad4vqlg4ogdcpu7qktshu6u6qov.apps.googleusercontent.com"} >
    <Provider store={Store} >
    <App />
    </Provider>
    </GoogleOAuthProvider>
);