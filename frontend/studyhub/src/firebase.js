import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADk8z-aKMI2XGWaE-KprM-6QNtC5mnGWw",
  authDomain: "studyhub-fantasticfour.firebaseapp.com",
  projectId: "studyhub-fantasticfour",
  storageBucket: "studyhub-fantasticfour.firebasestorage.app",
  messagingSenderId: "1048348883887",
  appId: "1:1048348883887:web:f3a609fc2b8a7afeb58d5a",
  measurementId: "G-WKHQP1FR27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services you’ll use elsewhere
export const auth = getAuth(app);
export const db = getFirestore(app);