import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import database, { auth } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { logout, selectUser } from "../../features/userSlice";
function Header({ show, isCustomer }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { customerID } = useParams();
  const [currentCustomer, setcurrentCustomer] = useState([]);

  useEffect(() => {
    if (customerID) {
      database
        .collection("customer")
        .doc(customerID)
        .onSnapshot((snapshot) => {
          setcurrentCustomer(snapshot.data()?.displayName);
        });
      console.log(customerID);
    }
  }, [customerID]);
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
      {show && (
        <>
          <div className="header__middle">
            <div className="header_middleLeft">
              <Avatar
                className="user__icon"
                src={`https://avatars.dicebear.com/api/human/:${customerID}.svg`}
              />
              <h4>{currentCustomer}</h4>
            </div>
          </div>
          <div className="header__right">
            <button type="submit">Mark as done</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
