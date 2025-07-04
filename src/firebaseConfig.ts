// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
import { getAuth } from "firebase/auth"; // Import getAuth
import { getStorage } from "firebase/storage"; // Import getStorage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Sj07kKWDTs3Y5C0DFr2BFZl7lsWid80",
  authDomain: "virtud-gimnasio.firebaseapp.com",
  projectId: "virtud-gimnasio",
  storageBucket: "virtud-gimnasio.firebasestorage.app",
  messagingSenderId: "236403374051",
  appId: "1:236403374051:web:e5a36cc6481bdef52152d6",
  measurementId: "G-ZYE3NG26PL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Get the auth instance

const db = getFirestore(app); // Get the Firestore instance

const storage = getStorage(app); // Get the Storage instance

export { app, auth, db, storage }; // Export app, auth, db, and storage