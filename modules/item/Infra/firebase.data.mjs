import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js"
import { 
  getFirestore,
  collection, 
  getDocs,
  deleteDoc,
  doc,
  addDoc, 
  onSnapshot, 
  enableIndexedDbPersistence 
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCCHRdAPxeWa2HJ1ormm8Fjy5UzKySJ7ok",
  authDomain: "shoplist-db-4f43f.firebaseapp.com",
  projectId: "shoplist-db-4f43f",
  storageBucket: "shoplist-db-4f43f.appspot.com",
  messagingSenderId: "875144526075",
  appId: "1:875144526075:web:1280261ec4e446cb55985e"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
  db,
  collection, 
  getDocs,
  doc,
  deleteDoc,
  addDoc, 
  onSnapshot, 
  enableIndexedDbPersistence 
}
