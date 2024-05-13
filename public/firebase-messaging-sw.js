// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDnbJ0mfNO2yjzINpJnkmXz7hlGl5ItYF0",
  authDomain: "pwa-split.firebaseapp.com",
  projectId: "pwa-split",
  storageBucket: "pwa-split.appspot.com",
  messagingSenderId: "843666568649",
  appId: "1:843666568649:web:89f5ad0ef6e85601012418",
  measurementId: "G-7H6ZCJSQQQ"
};

firebase.initializeApp(firebaseConfig);
  
// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
      notificationOptions);
});