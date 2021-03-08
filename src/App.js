import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import CustomerPanel from "./components/CustomerPanel";
import MessageBox from "./components/MessageBox";
import Timeline from "./components/Timeline";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Login from "./components/Login";
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
              <CustomerPanel />
              <Switch>
                <Route path="/users/:userID">
                  <Header />
                  <MessageBox />
                </Route>
              </Switch>
              <Timeline />
            </BrowserRouter>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
