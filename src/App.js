import "./App.css";
import Auth from "./components/Auth/Auth";
import Cookies from "universal-cookie";
import { useRef, useState } from "react";
import Chat from "./components/Chat/Chat";

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
    </div>
  );
}

export default App;
