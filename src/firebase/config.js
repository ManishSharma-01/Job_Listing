// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// // const firebaseConfig = {
//     apiKey: "AIzaSyByaKHbITJbtRiuHxoNoQUVZoYa9GG9FDM",
//     authDomain: "job-web-cc761.firebaseapp.com",
//     projectId: "job-web-cc761",
//     storageBucket: "job-web-cc761.appspot.com",
//     messagingSenderId: "515198664882",
//     appId: "1:515198664882:web:ec3a4c7f6478872c9cc9ab"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);

// export { app, firestore };

import app from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyByaKHbITJbtRiuHxoNoQUVZoYa9GG9FDM",
    authDomain: "job-web-cc761.firebaseapp.com",
    projectId: "job-web-cc761",
    storageBucket: "job-web-cc761.appspot.com",
    messagingSenderId: "515198664882",
    appId: "1:515198664882:web:ec3a4c7f6478872c9cc9ab"
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore, app};