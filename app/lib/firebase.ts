import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0jG1Xzxfo0FJk0ltqdPHYnb4Q2F96vDg",
  authDomain: "studio-5264455588-648eb.firebaseapp.com",
  projectId: "studio-5264455588-648eb",
  storageBucket: "studio-5264455588-648eb.firebasestorage.app",
  messagingSenderId: "1085339326674",
  appId: "1:1085339326674:web:7aad88711feb4033b4350b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
