// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXVPA8RC-WbzVxByiDrPuq45Vm3mVXqDc",
  authDomain: "ema-john-64cff.firebaseapp.com",
  projectId: "ema-john-64cff",
  storageBucket: "ema-john-64cff.appspot.com",
  messagingSenderId: "903380118414",
  appId: "1:903380118414:web:2229b322b0b96fe4a912df",
  measurementId: "G-CRFJRMYQ3V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
