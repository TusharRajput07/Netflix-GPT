// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXL2sMNHmqp7DYVWnkf4bMsbWN1QCRNnU",
  authDomain: "netflixgpt-9124c.firebaseapp.com",
  projectId: "netflixgpt-9124c",
  storageBucket: "netflixgpt-9124c.appspot.com",
  messagingSenderId: "525236499519",
  appId: "1:525236499519:web:bedbf0aea62eb80a8e348a",
  measurementId: "G-F2207ECKWP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
