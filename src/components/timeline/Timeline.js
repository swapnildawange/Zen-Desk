import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectUser } from "../../features/userSlice";
import database from "../firebase/firebase";
import TimelineIcon from "@material-ui/icons/Timeline";
import { CheckSquareOffset } from "phosphor-react";
import "./Timeline.css";
import Moment from "react-moment";
function Timeline() {
  const { customerID } = useParams();
  const [currentCustomer, setcurrentCustomer] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (customerID) {
      database
        .collection("customer")
        .doc(customerID)
        .onSnapshot((snapshot) => {
          setcurrentCustomer(snapshot.data());
        });

      database
        .collection("customer")
        .doc(customerID)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        });
    }
  }, [customerID]);
  // console.log(currentCustomer.isDone);
  return (
    <div className="timeline">
      <div className="timeline__top">
        <h3>Customer Info</h3>
      </div>

      <div className="timeline__customerInfo">
        <Avatar
          variant="rounded"
          className="user__icon"
          src={`https://avatars.dicebear.com/api/human/:${customerID}.svg`}
        />
        <p>{currentCustomer?.displayName}</p>
      </div>
      <div className="timeline__middle">
        <h3>Timeline</h3>
        <TimelineIcon />
      </div>
      <div className="timeline__info">
        <div className="timeline__infoStartTime">
          <Moment format="D MMM YYYY" withTitle>
            {messages[0]?.message.timestamp?.toDate()}
          </Moment>
        </div>

        <div className="timeline__infoContainer">
          <div className="timeline__infoElement">
            <div className="timeline__infoIcon ">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 3L2.49999 3.00002C1.67157 3.00002 0.999999 3.67159 0.999999 4.50002V9.50002C0.999999 10.3284 1.67157 11 2.5 11H7.50002C7.63263 11 7.75981 11.0527 7.85358 11.1465L9.99999 13.2929V11.5C9.99999 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3284 14 9.50002V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11928 15 4.5V9.50002C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8535L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50002V4.50002C0 3.11931 1.11928 2.00002 2.49999 2.00002Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="timeline__infoText">
              <p>Communication started by {currentCustomer?.displayName}</p>
            </div>
          </div>

          {currentCustomer?.isDone && (
            <>
              <div className="timeline__infoLine">
                <span></span>
              </div>
              <div className="timeline__infoElement">
                <div className="timeline__infoIcon">
                  <CheckSquareOffset size={16} />
                </div>
                <div className="timeline__infoText">
                  <p>Marked as done by {currentCustomer?.displayName}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
