import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import "./Header.css";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import database, { auth } from "../firebase";
import { useParams } from "react-router-dom";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { userID } = useParams();
  const [currentCustomer, setcurrentCustomer] = useState([]);

  useEffect(() => {
    if (userID) {
      database
        .collection("users")
        .doc(userID)
        .onSnapshot((snapshot) => {
          setcurrentCustomer(snapshot.data().displayName);
        });
      console.log(userID);
    }
  }, [userID]);

  const logoutFromApp = (e) => {
    dispatch(logout());
    auth.signOut();
    e.preventDefault();
  };
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <IconButton onClick={logoutFromApp}>
            <KeyboardBackspaceIcon className="back__icon" />
          </IconButton>
          <h1>Zen Desk</h1>
        </div>
      </div>
      <div className="header__middle">
        <div className="header_middleLeft">
          <Avatar
            className="user__icon"
            src={`https://avatars.dicebear.com/api/human/:${userID}.svg`}
          />
          <h5>{currentCustomer}</h5>
        </div>
        <button type="submit">Mark as done</button>
      </div>
      <div className="header__right"></div>
    </div>
  );
}

export default Header;
