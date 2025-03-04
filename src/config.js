// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHzmo1ETlXbP6HYWGkb6vmLEGCQXfzB3k",
  authDomain: "moreno-sandbox.firebaseapp.com",
  projectId: "moreno-sandbox",
  storageBucket: "moreno-sandbox.firebasestorage.app",
  messagingSenderId: "333323257075",
  appId: "1:333323257075:web:863e47f974fa37c2082386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app