// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAi__cKCwYCHvutfWKiTQ2_DT6w8vueQdk",
  authDomain: "app-movil-movil2.firebaseapp.com",
  databaseURL: "https://app-movil-movil2-default-rtdb.firebaseio.com",
  projectId: "app-movil-movil2",
  storageBucket: "app-movil-movil2.appspot.com",
  messagingSenderId: "1054469656393",
  appId: "1:1054469656393:web:fac8ae8b2922418da79498",
  measurementId: "G-8GNNGB1155",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
