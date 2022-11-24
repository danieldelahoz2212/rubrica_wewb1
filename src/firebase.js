// Import the functions you need from the SDKs you need
import app from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
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
app.initializeApp(firebaseConfig);
const db = app.firestore()
const auth = app.auth()
export { db, auth }