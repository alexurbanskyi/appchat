import React, { useEffect, useLayoutEffect, useState } from "react";
import {signOut} from 'firebase/auth'
import Cookies from "universal-cookie"
import "./header.css";

function Header({setIsAuth, setRoom, auth}) {
    const cookies = new Cookies();
    const [authData, setAuthData] = useState(null)

  console.log("AUTH HEader ---->", auth);
  

  async function signUserOut() {
    await signOut(auth);
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }
  useEffect(() => {
    setAuthData(auth)
  }, []);
  console.log("auth?.currentUser?.displayName ---->", authData?.currentUser?.displayName);

  return (
    <div className="header">
      <div>
        <img src={auth?.currentUser?.photoURL}  className="header_user_icon"/>
      </div> 
      <div className="header_user_name">{auth?.currentUser?.displayName}</div>
      <div className="header_logout" onClick={signUserOut}>
        <p className="logout_title">Sign Out</p>
        <p className="logout_icon">&#10148;</p>
      </div>
    </div>
  );
}

export default Header;
