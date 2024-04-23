import app, { initializeApp } from 'firebase/app';
import { Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

export class Firebase {

  constructor () {
    if (!apps.length) {
      app.initializeApp(firebaseConfig)
    } 

    Auth.auth().signInAnonymously()
    .then(() => {
            console.log('User signed in anonymously')
        })
    .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.')
            }
            console.error(error)
    })

  }

  auth () {
    return Auth;
  }
  
  database (){
    //app.database();
    return getFirestore(app);
  }
  
}

export default Firebase;

// For more information, see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
