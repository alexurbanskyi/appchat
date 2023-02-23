import React, { useState } from "react";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import "./header.css";

function Header({ setIsAuth, setRoom, auth }) {
  const cookies = new Cookies();

  async function signUserOut() {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  return (
    <div className="header">
      <div>
        <img
          src={localStorage.getItem("userPhoto")}
          className="header_user_icon"
        />
      </div>
      <div className="header_user_name">{localStorage.getItem("userName")}</div>
      <div className="header_logout" onClick={signUserOut}>
        <p className="logout_title">Sign Out</p>
        <p className="logout_icon">&#10148;</p>
      </div>
    </div>
  );
}

export default Header;
