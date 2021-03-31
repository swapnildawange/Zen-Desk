import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import database from "../firebase/firebase";
import "./CustomerChat.css";
function CustomerChat({ customerID, name }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      if (customerID) {
        await database
          .collection("chat")
          .doc(customerID)
          .collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            setMessages(
              snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
            );
          });
      }
    };
    getMessages();
  }, [customerID]);
  return (
    <Link to={`/customer/${customerID}`}>
      <div className="customerchat">
        <div className="customer__container">
          <div className="customer__avatar">
            <Avatar
              src={`https://avatars.dicebear.com/api/human/:${customerID}.svg`}
            />
          </div>
          <div className="customer__info">
            <h4>{name?.substring(0, 15)}</h4>
            <p>{messages[0]?.message.message.substring(0, 160)}</p>
          </div>

          {/* Update this */}

          {/* <div className="customer__message__count">
            <h5>6</h5>
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export default CustomerChat;
