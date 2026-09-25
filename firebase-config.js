import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5xd_XuEBP9kWkJepiHMcN5YI12g_OCUw",
  authDomain: "trustbank-91e66.firebaseapp.com",
  projectId: "trustbank-91e66",
  storageBucket: "trustbank-91e66.firebasestorage.app",
  messagingSenderId: "503416043337",
  appId: "1:503416043337:web:0e05859102033e6caacc98"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// YOUR ADMIN EMAIL
export const ADMIN_EMAIL = "rabiu666666@gmail.com";
