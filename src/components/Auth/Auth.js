import React from "react";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import "./auth.css";
import googleLogo from '../../images/google_icon.png'

import Cookies from "universal-cookie";
const cookies = new Cookies();

function Auth({ setIsAuth }) {
  async function signWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log("ERROR ---->", err);
    }
  }
  return (
    <div className="auth">
      <p className="auth_title">
        To get access to the chat, please register with your Google account
      </p>
      <div className="auth_button"  onClick={signWithGoogle}>
        <img className="auth_button_icon" src={googleLogo}/>
        <p className="auth_button_title">Sign In With GOOGLE</p>
      </div>
    </div>
  );
}

export default Auth;
