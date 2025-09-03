// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "designiq-11afe.firebaseapp.com",
  projectId: "designiq-11afe",
  storageBucket: "designiq-11afe.firebasestorage.app",
  messagingSenderId: "214821309082",
  appId: "1:214821309082:web:5d1a3688357138c749ed23",
  measurementId: "G-2WZYCCDGRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
