import { React, useEffect, useState } from "react";
import "./CustomerPanel.css";
import CustomerChat from "./CustomerChat";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { logout, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import database, { auth } from "../firebase/firebase";

function CustomerPanel() {
  const [customers, setCustomer] = useState([]);
  useEffect(() => {
    const unsubscibe = database
      .collection("customer")
      .onSnapshot((snapshot) => {
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

  // console.log(customer);
  return (
    <div className="customerPanel">
      <div className="customerPanel__mainContent">
        {customers.map((cust) => (
          <CustomerChat
            key={cust.id}
            customerID={cust.id}
            name={cust.data.displayName}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomerPanel;
