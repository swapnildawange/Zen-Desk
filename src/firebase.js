import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAgobFDJ3KvQMnf0aDDGc35dmhJWRvD5rw",
  authDomain: "messenger-3deca.firebaseapp.com",
  projectId: "messenger-3deca",
  storageBucket: "messenger-3deca.appspot.com",
  messagingSenderId: "821702569161",
  appId: "1:821702569161:web:d4bb3bb1ddc65f7ae93118"
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore()

export default database;
