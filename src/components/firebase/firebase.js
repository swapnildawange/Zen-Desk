import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDnXKivURHOxtgYA4v3Z8nFmTI4pnqh9RY",
  authDomain: "chat-application-6a999.firebaseapp.com",
  projectId: "chat-application-6a999",
  storageBucket: "chat-application-6a999.appspot.com",
  messagingSenderId: "121995122511",
  appId: "1:121995122511:web:7ab112685b41909455973a"
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();
export const auth = firebase.auth();
export default database;
