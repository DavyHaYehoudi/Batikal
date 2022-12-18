import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCK7CP_I_k4KUjcgvlBe9MYliMu-aYvgb8",
  authDomain: "batikal-dev.firebaseapp.com",
  projectId: "batikal-dev",
  storageBucket: "batikal-dev.appspot.com",
  messagingSenderId: "715137433472",
  appId: "1:715137433472:web:5e2ea9f00da04164678b65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);