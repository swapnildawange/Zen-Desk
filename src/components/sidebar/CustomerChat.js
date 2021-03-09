import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import database from "../firebase/firebase";
import "./CustomerChat.css";
function CustomerChat({ id, name }) {
  const [message, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      database
        .collection("customer")
        .doc(id)
        .collection("messages")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id, name]);
  return (
    <Link to={`/customer/${id}`}>
      <div className="customerchat">
        <div className="customer__container">
          <div className="customer__avatar">
            <Avatar src={`https://avatars.dicebear.com/api/human/:${id}.svg`} />
          </div>
          <div className="customer__info">
            <h4>{name?.substring(0, 15)}</h4>
            <p>{message[0]?.message.substring(0, 160)}</p>
          </div>
          <div className="customer__message__count">
            <h5>6</h5>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CustomerChat;
