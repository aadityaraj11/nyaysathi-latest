// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";  // Import GoogleAuthProvider
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-db-url",
    projectId: "your-project-id",
    storageBucket: "your-bucket",
    messagingSenderId: "your-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Export the GoogleAuthProvider
export const googleProvider = new GoogleAuthProvider();
