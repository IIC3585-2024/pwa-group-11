// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDnbJ0mfNO2yjzINpJnkmXz7hlGl5ItYF0",
  authDomain: "pwa-split.firebaseapp.com",
  projectId: "pwa-split",
  storageBucket: "pwa-split.appspot.com",
  messagingSenderId: "843666568649",
  appId: "1:843666568649:web:89f5ad0ef6e85601012418",
  measurementId: "G-7H6ZCJSQQQ"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    // The method getToken(): Promise<string> allows FCM to use the VAPID key credential
    // when sending message requests to different push services
    return getToken(messaging, { vapidKey: `BDI-tVQYyTaHt2aWH-UllsbJfexkqkubvMu-2yxesr03vc1NiwBQsmEmAFXpY-MpNiftGX0v5YDX_SNWNl98EzA` }) //to authorize send requests to supported web push services
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);

                if(localStorage.getItem('fcmToken') && currentToken !==localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }

                else if(!localStorage.getItem('fcmToken')){
                    localStorage.setItem('fcmToken', currentToken);

                }


            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });