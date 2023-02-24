import "./App.css";
import Auth from "./components/Auth/Auth";
import { auth } from "./firebase-config";
import Cookies from "universal-cookie";
import { useRef, useState } from "react";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const [room, setRoom] = useState("");
  const roomRef = useRef(null);

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div className="container">
      <Header setIsAuth={setIsAuth} setRoom={setRoom} auth={auth} />
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <div className="room_title">Enter <span>Room Name</span> For Start Chat</div>
          <input ref={roomRef} className="room_input" placeholder="enter room name..."/>
          <div className="room_button" onClick={() => setRoom(roomRef.current.value)}> Enter Chat</div>
          {/* <button onClick={() => setRoom(roomRef.current.value)}>
            Enter Chat
          </button> */}
        </div>
      )}
    </div>
  );
}

export default App;
