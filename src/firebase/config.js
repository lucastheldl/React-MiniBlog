import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAWl7cHsbb2mmm1lS48Frcevk0-NfZZ_94",
  authDomain: "miniblog-bb6f1.firebaseapp.com",
  projectId: "miniblog-bb6f1",
  storageBucket: "miniblog-bb6f1.appspot.com",
  messagingSenderId: "103511912913",
  appId: "1:103511912913:web:a03b66618f23fb8ed8b0f0",
};

const app = initializeApp(firebaseConfig);

const db = getFireStore(app);

export { db };
