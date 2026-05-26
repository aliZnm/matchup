import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3hSfe-bB_CkWrh6Jn97ZQhBGojgQVTks",
  authDomain: "matchup-4505f.firebaseapp.com",
  projectId: "matchup-4505f",
  storageBucket: "matchup-4505f.firebasestorage.app",
  messagingSenderId: "615384462629",
  appId: "1:615384462629:web:48fa79ef1f39e48d7496cc",
  measurementId: "G-71KPBZYL6W"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()