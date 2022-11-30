import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "netflix-plus-622b4.firebaseapp.com",
  projectId: "netflix-plus-622b4",
  storageBucket: "netflix-plus-622b4.appspot.com",
  messagingSenderId: "919533771194",
  appId: "1:919533771194:web:99020eac24f01f6493a583",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
