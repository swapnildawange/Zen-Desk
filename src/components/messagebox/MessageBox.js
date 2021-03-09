import React, { useRef, useState, useEffect } from "react";
import "./MessageBox.css";
import styled from "styled-components";
import {
  Input,
  FormHelperText,
  InputLabel,
  Button,
  FormControl,
  IconButton,
  Avatar,
} from "@material-ui/core";
import Picker from "emoji-picker-react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import Zoom from "@material-ui/core/Zoom";
import FlipMove from "react-flip-move";
import database from "../firebase/firebase";
import firebase from "firebase";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useParams } from "react-router-dom";
import Moment from "react-moment";

const StyledMessageBox = styled.div`
  bottom: 0;
  width: 100%;
  height: calc(100vh - 15vh);
  max-height: 74vh;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #3d4775;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #1e2640;
  }
`;

const Form = styled.form`
  padding: 10px 0;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 7.2vh;
  background: linear-gradient(#475284, #2b3358);
  backdrop-filter: blur(4px);
`;
const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  padding-left: 1rem;
`;
const StyledInsertEmoticonIcon = styled(InsertEmoticonIcon)`
  color: #f7f7fe !important;
  ${"" /* display: flex !important; */}
  cursor: pointer;
`;
const StyledInput = styled(Input)`
  flex: 1 !important;
  ${"" /* max-width: 100vw; */}
  margin: 0 1rem;
`;

const StyledIconButton = styled(IconButton)`
  flex: 0 !important;
  margin-right: 2rem !important;
  ${"" /* border: 2px solid red !important; */}
  background-color: rgba(7, 20, 63, 0.1) !important;
  color: #f7f7fe !important;
  box-shadow: 2px 2px 5px -1px rgba(7, 20, 63, 0.7) !important;
`;

function MessageBox({ match }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  let { customerID } = useParams(null);
  // let [customerID, setcustomerID] = useState("wgXRQxMcZEvMbQ3Ki6EH");
  const user = useSelector(selectUser);
  const mainRef = useRef(null);

  const [openEmojipicker, setOpenEmojipicker] = useState(false);

  const [chosenEmoji, setChosenEmoji] = useState(null);

  //add emoji in input field
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + chosenEmoji.emoji);
  };
  //get customerID

  //add messages to firebase

  useEffect(() => {
    mainRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    mainRef.current.focus();
  }, [mainRef, messages]);
  // show all messages on screen

  useEffect(() => {
    if (customerID) {
      // database
      //   .collection("customer")
      //   .doc(customerID)
      //   .onSnapshot((snapshot) => {
      //     setcurrentCustomer(snapshot.data().displayName);
      //   });

      database
        .collection("customer")
        .doc(customerID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        });
    }
  }, [customerID]);
  const sendMesssage = (event) => {
    event.preventDefault();
    database.collection("customer").doc(customerID).collection("messages").add({
      message: input,
      username: user.displayName,
      email: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  console.log(messages);
  return (
    <div className="message__box">
      <StyledMessageBox>
        <FlipMove>
          {messages.map(({ message, id }) => (
            <Message
              key={id}
              userName={user?.displayName}
              message={message}
              time={message.timestamp}
            />
          ))}
        </FlipMove>
        <div className="dummy" ref={mainRef}></div>
      </StyledMessageBox>
      {openEmojipicker && (
        <Picker className="message__emojipicker" onEmojiClick={onEmojiClick} />
      )}
      <div className="message__form">
        <Form>
          <StyledFormControl>
            <IconButton onClick={() => setOpenEmojipicker(!openEmojipicker)}>
              <StyledInsertEmoticonIcon />
            </IconButton>
            <StyledInput
              placeholder="Type something..."
              value={input}
              disableUnderline={true}
              style={{ color: "#f7f7fe" }}
              onChange={(event) => setInput(event.target.value)}
            />

            <Zoom className="app__iconButton" in={input}>
              <StyledIconButton
                disabled={!input}
                variant="contained"
                type="submit"
                onClick={sendMesssage}
              >
                <SendIcon />
              </StyledIconButton>
            </Zoom>
          </StyledFormControl>
        </Form>
      </div>
    </div>
  );
}

export default MessageBox;
