import { getMessaging, getToken} from 'firebase/messaging';
import {messaging} from "./firebase";

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BIYbIC9WvPVXuCkHIuoLPsQUiP1hutkszn6ZrycBL4_zCJ3iW6OJSNRWL9s76eTZuVrAcreme1KTZlZM92KUhkA" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};
