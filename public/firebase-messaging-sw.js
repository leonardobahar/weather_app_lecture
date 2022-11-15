// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDwi73vSiOD34fL938f2MKIS8zEmfrvCKA",
  authDomain: "weather-app-44c71.firebaseapp.com",
  projectId: "weather-app-44c71",
  storageBucket: "weather-app-44c71.appspot.com",
  messagingSenderId: "1037448841017",
  appId: "1:1037448841017:web:491ef77e310020d91d4ae8",
  measurementId: "G-XE6QDHV639"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

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
