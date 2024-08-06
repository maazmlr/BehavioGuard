// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4EK_ZECWzIlEv5RFx4P6k0akEFBf7zV4",
  authDomain: "smit-1e6f5.firebaseapp.com",
  projectId: "smit-1e6f5",
  storageBucket: "smit-1e6f5.appspot.com",
  messagingSenderId: "355874476269",
  appId: "1:355874476269:web:22a9cb863f718c1db03ce4",
  measurementId: "G-BCG0HPMP38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);