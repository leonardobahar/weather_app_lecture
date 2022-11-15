// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwi73vSiOD34fL938f2MKIS8zEmfrvCKA",
  authDomain: "weather-app-44c71.firebaseapp.com",
  projectId: "weather-app-44c71",
  storageBucket: "weather-app-44c71.appspot.com",
  messagingSenderId: "1037448841017",
  appId: "1:1037448841017:web:491ef77e310020d91d4ae8",
  measurementId: "G-XE6QDHV639"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const messaging = getMessaging();
