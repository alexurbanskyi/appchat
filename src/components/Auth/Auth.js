import React from "react";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function Auth({ setIsAuth }) {
  async function signWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      console.log("result --->", result);
    } catch (err) {
      console.log("ERROR ---->", err);
    }
  }
  return (
    <div>
      <p>Sign In With Google</p>
      <button onClick={signWithGoogle}>Sign In</button>
    </div>
  );
}

export default Auth;
