import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQNIC_ISJBT5HLhA598tFtazKBsIiB_oQ",
  authDomain: "info-6132-a8d3d.firebaseapp.com",
  databaseURL: "https://info-6132-a8d3d-default-rtdb.firebaseio.com",
  projectId: "info-6132-a8d3d",
  storageBucket: "info-6132-a8d3d.appspot.com",
  messagingSenderId: "555598083966",
  appId: "1:555598083966:web:e248308ea05ad0497ba52f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
