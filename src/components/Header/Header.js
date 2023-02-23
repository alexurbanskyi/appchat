import React from "react";
import {signOut} from 'firebase/auth'
import { auth } from "../../firebase-config";
import Cookies from "universal-cookie"
import "./header.css";

function Header({setIsAuth, setRoom}) {
    const cookies = new Cookies();

  console.log("AUTH ---->", auth);

  async function signUserOut() {
    await signOut(auth);
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  return (
    <div className="header">
      <div>
        <img src={auth?.currentUser.photoURL}  className="header_user_icon"/>
      </div> 
      <div className="header_user_name">{auth?.currentUser.displayName}</div>
      <div className="header_logout" onClick={signUserOut}>
        <p className="logout_title">Sign Out</p>
        <p className="logout_icon">&#10148;</p>
      </div>
    </div>
  );
}

export default Header;
