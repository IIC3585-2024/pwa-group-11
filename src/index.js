import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './services/routes';
import * as serviceWorkerRegistration from './services/serviceWorkerRegistration';

// import {ToastContainer, Zoom} from "react-toastify";
// import Notification from "./firebaseNotifications/Notification";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
          closeButton={false}
      />
      <Notification /> */}
      <Routes />
    </Router> 
  </React.StrictMode>,
  document.getElementById('root')
);

// Registro del Service Worker
serviceWorkerRegistration.register();
