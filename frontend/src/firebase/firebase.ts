import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB-TSYkmxWlhIf4YyXYe9wBXBZ7GNqhag8",
  authDomain: "clear-pte-ff08c.firebaseapp.com",
  projectId: "clear-pte-ff08c",
  storageBucket: "clear-pte-ff08c.firebasestorage.app",
  messagingSenderId: "321338802997",
  appId: "1:321338802997:web:7936d3195a92da7b7a427c"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);