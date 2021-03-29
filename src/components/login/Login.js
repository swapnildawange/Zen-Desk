import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userSlice";
import database, { auth } from "../firebase/firebase";
import firebase from "firebase";
import "./Login.css";
function Login({ type }) {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customer, setCustomer] = useState("");
  const dispatch = useDispatch();

  const loginToApp = async (e) => {
    e.preventDefault();
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            displayName: userAuth.user.displayName,
            email: userAuth.user.email,
            id: userAuth.user.photoURL,
          })
        );
      })
      .catch((err) => alert(err));
  };
  // const addToDatabse = () => { ;};

  const register = async () => {
    if (!name) {
      return alert("Please enter full name to register");
    }

    //using photoURL to store the id from firestore for identification of collection

    await database
      .collection("customer")
      .add({
        displayName: name,
        email: email,
        password: password,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((response) => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userAuth) => {
            userAuth.user
              .updateProfile({
                displayName: name,
                email: email,
                photoURL: response.id,
              })
              .then(() => {
                dispatch(
                  login({
                    email: userAuth.user.email,
                    displayName: userAuth.user.displayName,
                    id: userAuth.user.photoURL,
                  })
                );
              });
          });
      });
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
