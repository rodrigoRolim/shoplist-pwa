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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
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
