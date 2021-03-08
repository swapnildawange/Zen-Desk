import { React, useEffect, useState } from "react";
import "./CustomerPanel.css";
import database from "../firebase";
import CustomerChat from "./CustomerChat";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";

function CustomerPanel() {
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    const unsubscibe = database.collection("users").onSnapshot((snapshot) => {
      setCustomer(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubscibe();
    };
  }, []);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logoutFromApp = (e) => {
    dispatch(logout());
    auth.signOut();
    e.preventDefault();
  };
  // console.log(customer);
  return (
    <div className="customerPanel">
      {/* <div className="customerPanel__header">
        <IconButton onClick={logoutFromApp}>
          <KeyboardBackspaceIcon className="back__icon" />
        </IconButton>
        <h1>Zen Desk</h1>
      </div> */}
      <div className="customerPanel__mainContent">
        {customer.map((cust) => (
          <CustomerChat
            key={cust.id}
            id={cust.id}
            name={cust.data.displayName}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomerPanel;
