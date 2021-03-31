import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userSlice";
import database, { auth } from "../firebase/firebase";
import firebase from "firebase";
import "./Login.css";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
function LoginEmployee({ type }) {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customer, setCustomer] = useState("");
  const [err, setErr] = useState({});
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
        setErr({
          severity: "success",
          error: "successfully logged in",
        });
      })
      .catch((err) => {
        setErr({
          severity: "error",
          error: "couldn't find your account",
        });
      });
  };
  const register = async () => {
    if (!name) {
      setErr({
        severity: "warning",
        error: "Please enter your full name",
      });
      return;
    }

    //using photoURL to store the id from firestore for identification of collection
    await database
      .collection("employee")
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
          })
          .catch((err) => {
            setErr({
              severity: "error",
              error: "couldn't register new employee",
            });
            database.collection("employee").doc(response.id).delete();
          });
      })
      .catch((err) => {
        setErr({
          severity: "error",
          error: "couldn't register new employee",
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
        <Button type="submit" onClick={loginToApp}>
          LOGIN
        </Button>
        <p>
          Not a member?&nbsp;
          <span className="login__register" onClick={register}>
            Register now
          </span>
        </p>
        {err.severity && <Alert severity={err.severity}>{err.error}</Alert>}
      </form>
    </div>
  );
}

export default LoginEmployee;
