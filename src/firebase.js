import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgOgJ-R3upLfBjbcx34xG-kDd1IjHAu0c",
    authDomain: "rubricafinal-8cf54.firebaseapp.com",
    projectId: "rubricafinal-8cf54",
    storageBucket: "rubricafinal-8cf54.appspot.com",
    messagingSenderId: "676702234561",
    appId: "1:676702234561:web:6c081e29aeef1aed07f140"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth()
export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword }