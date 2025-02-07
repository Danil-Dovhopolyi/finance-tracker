import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEKvZRBMrJMMY8Mn50BEShFmJwV7xfn1o",
  authDomain: "finance-tracker-b9d8f.firebaseapp.com",
  projectId: "finance-tracker-b9d8f",
  storageBucket: "finance-tracker-b9d8f.firebasestorage.app",
  messagingSenderId: "727245853816",
  appId: "1:727245853816:web:76aee064a1713ddb58c98d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);