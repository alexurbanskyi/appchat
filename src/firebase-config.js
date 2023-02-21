// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhQwU3JEfQ2HVzC34BZ6YNsKCWEOg7wcg",
  authDomain: "chat-app-8b85f.firebaseapp.com",
  projectId: "chat-app-8b85f",
  storageBucket: "chat-app-8b85f.appspot.com",
  messagingSenderId: "47580502884",
  appId: "1:47580502884:web:3449c8dcc581bd1034b871"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);