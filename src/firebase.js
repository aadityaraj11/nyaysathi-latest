// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Import GoogleAuthProvider
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPC1q5G37pURwHuByVE-8bLt0mKhbv7Gg",
    authDomain: "nyaysaathi-25335.firebaseapp.com",
    databaseURL: "https://nyaysaathi-25335-default-rtdb.firebaseio.com",
    projectId: "nyaysaathi-25335",
    storageBucket: "nyaysaathi-25335.firebasestorage.app",
    messagingSenderId: "496077935792",
    appId: "1:496077935792:web:12e1f4c3051644c335d775",
    measurementId: "G-4TL00TKBGN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Export the GoogleAuthProvider
export const googleProvider = new GoogleAuthProvider();