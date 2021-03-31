import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCuM8qk9RQBAnGUbF1vouH3PjUv2ZMv3FM",
  authDomain: "zen-desk-6c1b2.firebaseapp.com",
  projectId: "zen-desk-6c1b2",
  storageBucket: "zen-desk-6c1b2.appspot.com",
  messagingSenderId: "686793260280",
  appId: "1:686793260280:web:bf3f2a4badda1fe6214f0d"
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();
export const auth = firebase.auth();
export default database;
