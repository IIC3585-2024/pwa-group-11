// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnQ5zU0a3bXSfCexEVZ5BdjU6QnAcukfI",
    authDomain: "pwa-grupo-11.firebaseapp.com",
    projectId: "pwa-grupo-11",
    storageBucket: "pwa-grupo-11.appspot.com",
    messagingSenderId: "542670622375",
    appId: "1:542670622375:web:eaf6a0fa7f89fac2d55582",
    measurementId: "G-BFZEWDRQ3P"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the service

export const messaging = getMessaging(app);