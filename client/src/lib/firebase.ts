// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP2W1kM0mAzm6eKcY2LUnqOX6LSBFidxw",
  authDomain: "engnf1-887e6.firebaseapp.com",
  projectId: "engnf1-887e6",
  storageBucket: "engnf1-887e6.firebasestorage.app",
  messagingSenderId: "160396528013",
  appId: "1:160396528013:web:43c96d96ce6c7585ff95c4",
  measurementId: "G-JGWFZGFWLQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics only if supported (prevents SSR issues)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}
