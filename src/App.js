import React, { useEffect } from "react";
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
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div>
          <div className="app__main">
            <BrowserRouter>
              <Switch>
                <Route exact path="/customer">
                  <div className="app__gridContainer">
                    <div className="app__header">
                      <Header show={false} />
                    </div>
                    <div className="app__sidebar">
                      <CustomerPanel />
                    </div>
                    <div className="app__messages"></div>
                    <div className="app__timeline"></div>
                  </div>
                </Route>

                <Route exact path="/customer/:customerID">
                  <div className="app__gridContainer">
                    <div className="app__header">
                      <Header show={true} />
                    </div>
                    <div className="app__sidebar">
                      <CustomerPanel />
                    </div>
                    <div className="app__messages">
                      <MessageBox />
                    </div>
                    <div className="app__timeline">
                      <Timeline />
                    </div>
                  </div>
                </Route>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
{
  /*  */
}
{
}
