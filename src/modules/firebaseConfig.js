import {initializeApp} from "firebase/app";
import {getDatabase, ref , onValue, update, push, ref, set, remove} from "firebase/database";
import { collection, doc } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwhZaRkSQSBGtibMbGCsC48lvH37yE9ms",
    authDomain: "ga-finalproject.firebaseapp.com",
    databaseURL: "https://ga-finalproject-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ga-finalproject",
    storageBucket: "ga-finalproject.appspot.com",
    messagingSenderId: "473841586488",
    appId: "1:473841586488:web:18cf6acc028c5d9d8cf1cd"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const tasksRef = ref(db, 'tasks');
export {db, tasksRef, onValue, ref, update, push, set, remove} 