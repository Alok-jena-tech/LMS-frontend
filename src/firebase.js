// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEstXChmFP3rGeZ3HD7vFjjiyZdsLOkq8",
  authDomain: "digital-academy-d7f9c.firebaseapp.com",
  projectId: "digital-academy-d7f9c",
  storageBucket: "digital-academy-d7f9c.firebasestorage.app",
  messagingSenderId: "780795547998",
  appId: "1:780795547998:web:5a4b34af7409990e5cffcf",
  measurementId: "G-5N81BG03VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);