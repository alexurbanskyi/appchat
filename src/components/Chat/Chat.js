import React, { useEffect, useState } from "react";
import "./chat.css";
import UserMessage from "./UserMessage";

import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../../firebase-config";

function Chat({ room }) {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room), orderBy('createdAt'));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
        let messagesArr = [];
      snapshot.forEach((doc) => {
        messagesArr.push({ ...doc.data(), id: doc.id });
      });
      console.log("You Have New Messages", messagesArr );
      setMessages(messagesArr)
    });
    return () => unsuscribe()
  }, []);

  async function handelSubmit() {
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });
    setNewMessage("");
  }

  


  return (
    <div className="chat">
      
        <div className="chat_greeting">Welcome</div>
        <div className="chat_name_title">ROOM:</div>
        <div className="chat_name">{room}</div>
        
        {
          messages.map((mess) => <UserMessage message={mess} />)
        }
        {/* {
            messages.map((mess) => <div key={mess.id}>{mess.text}</div> )
        } */}
      <input
        placeholder="type your message..."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <button onClick={handelSubmit}>SEND</button>
    </div>
  );
}

export default Chat;
