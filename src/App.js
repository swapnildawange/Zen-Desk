import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {
  Input,
  FormHelperText,
  InputLabel,
  Button,
  FormControl,
  IconButton,
  AppBar,
} from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { withStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import FlipMove from "react-flip-move";
import Picker from "emoji-picker-react";

import Message from "./components/Message";
import database from "./firebase";
import firebase from "firebase";
import "./App.css";
import Header from "./components/Header";

const StyledMessageBox = styled.div`
  width: 100%;
  ${"" /* padding-bottom: 4em;
  position: relative; */}
  ${"" /* top: 10rem;
  bottom: 3.6rem; */}
  ${"" /* border: 2px solid red; */}
  ${"" /* overflow-y: scroll; */}
`;

const Form = styled.form`
  position: fixed;
  ${"" /* padding: 0 10px 10px 10px; */}
  padding:10px;
  bottom: 0;
  z-index: 1;
  width: 100%;
  background-color: #283056;
  ${"" /* background-color: #758283; */}
  backdrop-filter: blur(4px);
`;
const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: center !important;
`;
const StyledInsertEmoticonIcon = styled(InsertEmoticonIcon)`
  color: #f7f7fe !important;
  display: flex !important;
  margin-left: 1rem;
  cursor: pointer;
`;
const StyledInput = styled(Input)`
  flex: 1 !important;
  max-width: 100vw;
  ${"" /* border: 2px solid rgba(7, 20, 63, 0.1); */}
  ${"" /* border-radius: 100vw; */}
  padding-left: 1rem !important;
  ${"" /* background-color: rgba(7, 20, 63, 0.1); */}
  ${"" /* box-shadow: inset -4px -4px 4px rgba(7, 20, 63, 0.1); */}
  
  margin:0 1rem;
`;

const StyledIconButton = styled(IconButton)`
  flex: 0 !important;
  margin-right: 2rem !important;
  ${"" /* border: 2px solid red !important; */}
  background-color: rgba(7, 20, 63, 0.1) !important;
  color: #f7f7fe !important;
  box-shadow: 2px 2px 5px -1px rgba(7, 20, 63, 0.7) !important;
`;
const StyledTitleBar = styled.div`
  height: fit-content;
  text-align: center;
  ${"" /* background-color: rgba(196, 196, 196, 0.3); */}
  padding: 1rem;
  z-index: 20;
  color: white;
  line-height: 1.5;
  position: fixed;
  padding: 0 10px 10px 10px;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: rgba(40, 48, 86, 0.2);
  backdrop-filter: blur(14px);
  filter: hue-rotate(230 deg);
`;

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [userName, setUserName] = useState("");
  const mainRef = useRef(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

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

  // useEffect(() => {
  //   let username = null;
  //   while (!username) {
  //     username = prompt("Please Enter your name ");
  //   }
  //   setUserName(username);
  // }, []);

  useEffect(() => {
    database
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);
  const showEmoji = (event) => <Picker onEmojiClick={onEmojiClick} />;
  const sendMesssage = (event) => {
    event.preventDefault();
    database.collection("messages").add({
      message: input,
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessages((messages) => [
      ...messages,
      { username: userName, message: input },
    ]);
    setInput("");
  };
  return (
    <div className="app">
    <div className="app__main">

   
      <Header />
      {/* <StyledTitleBar>
        <h1>Chat App</h1>
        <h2>Welcome {userName}</h2>
      </StyledTitleBar> */}
      <StyledMessageBox>
        {messages.map(({ message, id }) => (
          <Message
            key={id}
            userName={userName}
            message={message}
            time={message.timestamp}
          />
        ))}
        <div className="dummy" ref={mainRef}></div>
      </StyledMessageBox>

      <Form>
      {/* <div className="main__rightSidebar">

      </div> */}
        <StyledFormControl>
          <StyledInsertEmoticonIcon onclick={showEmoji} />
          <StyledInput
            placeholder="Enter a message..."
            value={input}
            disableUnderline={true}
            // multiline={true}
            style={{ color: "#f7f7fe" }}
            onChange={(event) => setInput(event.target.value)}
          />

          <Zoom className="app__iconButton" in={input}>
            <StyledIconButton
              disabled={!input}
              variant="contained"
              // color="#BBC2D1"
              // style={{ color: "#BBC2D1" }}
              type="submit"
              onClick={sendMesssage}
            >
              <SendIcon />
            </StyledIconButton>
          </Zoom>
        </StyledFormControl>
      </Form>
      <FlipMove></FlipMove>
    </div>
    </div>
  );
}

export default App;
