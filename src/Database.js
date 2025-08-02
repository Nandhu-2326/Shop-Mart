
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA3afOR_jItETUYr4OIOZM8Q7O3jr2MpTs",
  authDomain: "shop-4fe27.firebaseapp.com",
  projectId: "shop-4fe27",
  storageBucket: "shop-4fe27.firebasestorage.app",
  messagingSenderId: "394177925947",
  appId: "1:394177925947:web:527ff5d6abe015dab01d1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }