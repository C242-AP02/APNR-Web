import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4_ENyRvi0QROM47lWVKCWfczRGhfxgxg",
  authDomain: "apnr-development-4ea10.firebaseapp.com",
  projectId: "apnr-development-4ea10",
  storageBucket: "apnr-development-4ea10.firebasestorage.app",
  messagingSenderId: "994118876089",
  appId: "1:994118876089:web:d0a874779b16954cd95468",
  measurementId: "G-V2RVN81SJC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();