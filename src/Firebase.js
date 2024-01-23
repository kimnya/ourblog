// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAJ03rOPT9l7SI-bZEsgoa2K0H83jZVZ5o',
  authDomain: 'ourblog-91058.firebaseapp.com',
  projectId: 'ourblog-91058',
  storageBucket: 'ourblog-91058.appspot.com',
  messagingSenderId: '69918481862',
  appId: '1:69918481862:web:93a3a37a299713da8e66c7',
  measurementId: 'G-3G1F6VWDPN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
