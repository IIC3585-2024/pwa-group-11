import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './services/routes';
import * as serviceWorkerRegistration from './services/serviceWorkerRegistration';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes />
    </Router> 
  </React.StrictMode>,
  document.getElementById('root')
);

// Registro del Service Worker
serviceWorkerRegistration.register();
