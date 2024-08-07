// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQkaVmj6kC75bTZaf4iMljC_znduWsOB0",
  authDomain: "todo-app-firebase-3e6b3.firebaseapp.com",
  projectId: "todo-app-firebase-3e6b3",
  storageBucket: "todo-app-firebase-3e6b3.appspot.com",
  messagingSenderId: "757945981186",
  appId: "1:757945981186:web:5b7a4489a3c70c94a58a1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export default db;