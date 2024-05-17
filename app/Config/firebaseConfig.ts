import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, initializeAuth, GoogleAuthProvider, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
 

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get database refernce - to be able to work with the database
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const database = getFirestore(app);

// For more information, see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase