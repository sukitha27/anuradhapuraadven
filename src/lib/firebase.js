import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from 'firebase/functions'; // <-- new

const firebaseConfig = {
  apiKey: "AIzaSyDkS2adh5f3XjD-jn2rekqDiZYCf8GP38E",
  authDomain: "anuradhapura-adventures-review.firebaseapp.com",
  projectId: "anuradhapura-adventures-review",
  storageBucket: "anuradhapura-adventures-review.firebasestorage.app",
  messagingSenderId: "178894625426",
  appId: "1:178894625426:web:12def83ec93048035b244b",
  measurementId: "G-CTKHY8V093"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);      // <-- export