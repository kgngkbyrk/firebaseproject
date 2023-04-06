// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdNc8gCiviG_U-jsxaVHZt_IWC-QGO-oo",
  authDomain: "react-firebaseproject-365f4.firebaseapp.com",
  projectId: "react-firebaseproject-365f4",
  storageBucket: "react-firebaseproject-365f4.appspot.com",
  messagingSenderId: "432591712089",
  appId: "1:432591712089:web:a7f271eea7dfda98d7e648"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);