// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration.  
//
// Usually, you need to fastidiously guard API keys (for example, by 
// setting the keys as environment variables); 
// however, API keys for Firebase services are ok to include in code or checked-in config files.
const firebaseConfig = {
    apiKey: "AIzaSyD1ehouo5MBE7KUNz2J8mSnji25M4YwTeo",
    authDomain: "academy-auth-demo-75a33.firebaseapp.com",
    projectId: "academy-auth-demo-75a33",
    storageBucket: "academy-auth-demo-75a33.appspot.com",
    messagingSenderId: "763059330847",
    appId: "1:763059330847:web:1d1901efbd77dd7c199a2a",
    measurementId: "G-4WNW28DMYF"
  };

// Initialize Firebase as a whole
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//Other auth providers include github, twitter, apple.
//These must be enabled in your firebase console.
export const googleAuthProvider = new GoogleAuthProvider();
