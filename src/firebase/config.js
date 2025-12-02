import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC38k1qE5AEuShOfbCiHD-hN_Sx-bxmVkk",
  authDomain: "sumula-digital-db.firebaseapp.com",
  projectId: "sumula-digital-db",
  storageBucket: "sumula-digital-db.firebasestorage.app",
  messagingSenderId: "431972272159",
  appId: "1:431972272159:web:0bd25f09b9e28ae2c7ad2a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };