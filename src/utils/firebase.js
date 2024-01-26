// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCCBviSN5ptSMg-n8HLEIMqngxTe-4rhc",
  authDomain: "netflixgpt-eff01.firebaseapp.com",
  projectId: "netflixgpt-eff01",
  storageBucket: "netflixgpt-eff01.appspot.com",
  messagingSenderId: "458442859991",
  appId: "1:458442859991:web:5bdfacf5121c600d94d792",
  measurementId: "G-05H1PZCPVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); // In every firebase apicalls we need this so we are storing it as global

// npm install firebase

// copy the code which firebase gives like code in this file

// npm install -g firebase-tools (to install firebase cli)

// firebase login (for login)

// firebase init  (to initialize project and create firebase confgistrations)
    // give all details and give folder name as build for deployment 

// firebase deploy (to deploy the build)

// npm run build (to create a prod ready build folder)