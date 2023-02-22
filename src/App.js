import "./App.css";
import Auth from "./components/Auth/Auth";
import Cookies from "universal-cookie";
import { useRef, useState } from "react";
import Chat from "./components/Chat/Chat";
import {signOut} from 'firebase/auth'
import {auth} from './firebase-config'


const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  const roomRef = useRef(null);

  async function signUserOut() {
    await signOut(auth);
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div>
          <label>Enter Room Name</label>
          <input ref={roomRef} />
          <button onClick={() => setRoom(roomRef.current.value)}>Enter Chat</button>
        </div>
      )}
      <div>
        <button onClick={signUserOut}>Sign OUT</button>
      </div>
    </div>
  );
}

export default App;
