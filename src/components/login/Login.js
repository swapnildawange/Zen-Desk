import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import database, { auth } from "../firebase/firebase";
import firebase from "firebase";
import "./Login.css";
function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginToApp = async (e) => {
    e.preventDefault();
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        console.log(userAuth);
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((err) => alert(err));

    // database.collection("customer").add({
    //   displayName: name,
    //   email: email,
    //   password: password,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
  };
  // const addToDatabse = () => { ;};

  const register = () => {
    if (!name) {
      return alert("Please enter full name to register");
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            email: email,
            password: password,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
              })
            );
            database.collection("customer").add({
              displayName: name,
              email: email,
              password: password,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <form className="login__input" action="submit">
        <input
          type="text"
          placeholder="Enter full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" onClick={loginToApp}>
          LOGIN
        </button>
        <p>
          Not a member?&nbsp;
          <span className="login__register" onClick={register}>
            Register now
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
