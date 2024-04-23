import { initializeApp } from 'firebase/app';

// Optionally import here the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAc6kShtPvDJTwqXf4J9lWDGXPSdpD1L6k",
    authDomain: "rehavision-d8ee5.firebaseapp.com",
    projectId: "rehavision-d8ee5",
    storageBucket: "rehavision-d8ee5.appspot.com",
    messagingSenderId: "1070155202945",
    appId: "1:1070155202945:web:3af87e65fc3bbddc702880"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// For more information, see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
