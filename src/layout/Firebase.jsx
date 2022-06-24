// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChSgJky4gRD5iWEDcz1sJsAP1U1e9yorE",
  authDomain: "qlsv-final.firebaseapp.com",
  projectId: "qlsv-final",
  storageBucket: "qlsv-final.appspot.com",
  messagingSenderId: "863577602333",
  appId: "1:863577602333:web:3763f85763a645707209f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const auth = getAuth();
