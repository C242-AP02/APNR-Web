import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOBUfqN6omevAiesEHzr6SMUx9e_fiudE",
  authDomain: "apnr-megalogic.firebaseapp.com",
  projectId: "apnr-megalogic",
  storageBucket: "apnr-megalogic.firebasestorage.app",
  messagingSenderId: "580245180821",
  appId: "1:580245180821:web:e134ccf7e703d35637a69c",
  measurementId: "G-2KDHT3QKBR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();