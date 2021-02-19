import { Avatar, Button } from "@material-ui/core";
import React from "react";

import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <button color="primary">back</button>
          <h1>Zen Desk</h1>
        </div>
        <div className="header__left__user">
          <Avatar className="user__icon" />
          <p>Assigned:</p>
          <h5>&nbsp; Dog Johanson</h5>
        </div>
        <button type="submit">Mark as done</button>
      </div>
      <div className="header__right"></div>
    </div>
  );
}

export default Header;
