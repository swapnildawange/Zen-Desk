import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header.js";
import CustomerPanel from "./components/sidebar/CustomerPanel";
import MessageBox from "./components/messagebox/MessageBox";
import Timeline from "./components/timeline/Timeline";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./components/firebase/firebase";
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  useParams,
} from "react-router-dom";
import LoginCustomer from "./components/login/LoginCustomer";
import LoginEmployee from "./components/login/LoginEmployee";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [type, setType] = useState("customer");
  // useEffect(() => {
  //   auth.onAuthStateChanged((userAuth) => {
  //     if (userAuth) {
  //       dispatch(
  //         login({
  //           displayName: userAuth.displayName,
  //           email: userAuth.email,
  //           id: userAuth.photoURL,
  //         })
  //       );
  //     } else {
  //       dispatch(logout());
  //     }
  //   });
  // }, [dispatch, type]);
  return (
    <div className="app">
      <div className="app__main">
        <BrowserRouter>
          <Switch>
            <Route path="/chat">
              {!user ? (
                <LoginCustomer />
              ) : (
                <div className="app__customergridContainer">
                  <div className="app__header">
                    <Header type={"customer"} />
                  </div>
                  <div className="app__messages">
                    <MessageBox type={"customer"} />
                  </div>
                </div>
              )}
            </Route>

            <Route path="/">
              {!user ? (
                <LoginEmployee />
              ) : (
                <>
                  <Route path="/">
                    <div className="app__gridContainer">
                      <div className="app__header">
                        <Header type={"employee"} />
                      </div>
                      <div className="app__messages"></div>
                      <div className="app__timeline"></div>
                      <div className="app__sidebar"></div>
                      <Route path="/customer/:customerID">
                        <div className="app__header">
                          <Header type={"employee"} />
                        </div>
                        <div className="app__messages">
                          <MessageBox type={"employee"} />
                        </div>
                        <div className="app__timeline">
                          <Timeline />
                        </div>
                      </Route>
                      <div className="app__sidebar">
                        <CustomerPanel />
                      </div>
                    </div>
                  </Route>
                </>
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
