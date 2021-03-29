import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header.js";
import CustomerPanel from "./components/sidebar/CustomerPanel";
import MessageBox from "./components/messagebox/MessageBox";
import Timeline from "./components/timeline/Timeline";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./components/firebase/firebase";
import Login from "./components/login/Login";
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  useParams,
} from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [type, setType] = useState("customer");
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            displayName: userAuth.displayName,
            email: userAuth.email,
            id: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch, type]);

  return (
    <div className="app">
      <div className="app__main">
        {!user ? (
          <Login type={type} />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route path="/chat">
                <div className="app__customergridContainer">
                  <div className="app__header">
                    <Header show={false} />
                  </div>
                  <div className="app__messages">
                    <MessageBox type={type} />
                  </div>
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;
