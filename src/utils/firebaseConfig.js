import { initializeApp } from 'firebase/app';
import { getAuth  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDYbppe6aaQtciPV4sQDxqFTWECEBjDUvY",
    authDomain: "hostelmgmt-41baf.firebaseapp.com",
    projectId: "hostelmgmt-41baf",
    storageBucket: "hostelmgmt-41baf.firebasestorage.app",
    messagingSenderId: "180032029997",
    appId: "1:180032029997:web:8a40835d0a44da960e7fa4",
    measurementId: "G-TQGLWYRPNL"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);


export { auth, firestore ,storage,database };
