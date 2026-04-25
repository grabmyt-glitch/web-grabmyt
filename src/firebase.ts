// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe5ZKd4BJvbB7zpHVTP-2lVdb7XZjtzYg",
  authDomain: "grab-my-ticket.firebaseapp.com",
  projectId: "grab-my-ticket",
  storageBucket: "grab-my-ticket.firebasestorage.app",
  messagingSenderId: "908061819464",
  appId: "1:908061819464:web:7bd05345f4a07fbdb5ce7d",
  measurementId: "G-TQYWHMYMV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);