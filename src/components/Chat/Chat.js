import React, { useEffect, useState } from "react";
import "./chat.css";

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
    console.log("newMessage!!", newMessage);
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
        <h1>Welcome to: {room}</h1>
        {
            messages.map((mess) => <div key={mess.id}>{mess.text}</div> )
        }
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
