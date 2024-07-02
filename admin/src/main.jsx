import React from 'react'
import ReactDOM,{ createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';


// Render the application inside the root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App/>
    </Provider>
);
