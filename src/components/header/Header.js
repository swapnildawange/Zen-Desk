import React, { useEffect, useRef, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import database, { auth } from "../firebase/firebase";
import { logout, selectUser } from "../../features/userSlice";
import { useParams } from "react-router";
function Header({ type }) {
  const user = useSelector(selectUser);
  let { customerID } = useParams();
  if (type === "customer") {
    customerID = user.id;
  }

  const [currentCustomer, setcurrentCustomer] = useState(null);
  const [isMarked, setisMarked] = useState(null);
  const dispatch = useDispatch();
  const markBtn = useRef();
  const logoutFromApp = (e) => {
    dispatch(logout());
    auth.signOut();
    e.preventDefault();
  };

  useEffect(() => {
    getCurrentCustomer();
  }, [customerID]);

  const getCurrentCustomer = async () => {
    if (customerID) {
      await database
        .collection("customer")
        .doc(customerID)
        .onSnapshot((snapshot) => {
          setcurrentCustomer(snapshot.data());
        });
      await setisMarked(currentCustomer?.isDone);
    }
  };
  const markAsDone = async (e) => {
    e.preventDefault();

    await database
      .collection("customer")
      .doc(customerID)
      .update({ isDone: !isMarked });
    getCurrentCustomer();
  };
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <IconButton onClick={logoutFromApp}>
            <KeyboardBackspaceIcon className="back__icon" />
          </IconButton>
          <h2 className="header__title">Zen Desk</h2>
        </div>
      </div>
      <>
        <div className="header__middle">
          <div className="header_middleLeft">
            <Avatar
              className="user__icon"
              src={`https://avatars.dicebear.com/api/human/:${user.id}.svg`}
            />
            <h4>{user.displayName}</h4>
          </div>
        </div>
        <div className="header__right">
          {type === "customer" && (
            <>
              <IconButton
                className="markBtnText"
                ref={markBtn}
                type="submit"
                onClick={markAsDone}
              >
                {currentCustomer?.isDone ? (
                  <>Marked as done</>
                ) : (
                  <>Mark as done</>
                )}
              </IconButton>
              <IconButton
                className="markBtnIcon"
                ref={markBtn}
                type="submit"
                onClick={markAsDone}
              >
                {currentCustomer?.isDone ? (
                  <>
                    <DoneAllIcon />
                  </>
                ) : (
                  <>
                    <DoneIcon />
                  </>
                )}
              </IconButton>
            </>
          )}
        </div>
      </>
    </div>
  );
}

export default Header;
