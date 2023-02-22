import React, { useEffect, useState } from "react";
import "./chat.css";

import { addDoc, collection, serverTimestamp, onSnapshot, query, where} from "firebase/firestore";
import { db, auth } from "../../firebase-config";

function Chat({room}) {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, 'messages');
  useEffect(() => {
    const queryMessages = query(messageRef, where('room', '==', room) )
    onSnapshot(queryMessages, () => {console.log('You Have New Messages')});
  }, []);

  async function handelSubmit() {
    console.log("newMessage!!", newMessage);
    if (newMessage === "") return;

    await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room: room

    });
    setNewMessage('');
  }
  return (
    <div className="chat">
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
