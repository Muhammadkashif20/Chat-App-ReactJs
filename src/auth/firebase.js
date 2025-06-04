// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMPtLENiQydgnnpy5nzxxUTdvIlSqVNjw",
  authDomain: "chat-app-d35ea.firebaseapp.com",
  projectId: "chat-app-d35ea",
  storageBucket: "chat-app-d35ea.firebasestorage.app",
  messagingSenderId: "639493715585",
  appId: "1:639493715585:web:44936917db9ef60309bf80",
  measurementId: "G-0ZKV4Z58N1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
