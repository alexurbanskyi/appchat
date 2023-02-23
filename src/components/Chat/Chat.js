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
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
    });
    setNewMessage("");
  }

  // const sec = messages[3].createdAt
  // console.log('sec  --->', sec)
  // const datePost = new Date(sec.seconds * 1000);
  // const formatted_date = datePost.getFullYear() + '-' + 
  //                          ('0' + (datePost.getMonth() + 1)).slice(-2) + '-' + 
  //                          ('0' + datePost.getDate()).slice(-2) + ' ' + 
  //                          ('0' + datePost.getHours()).slice(-2) + ':' + 
  //                          ('0' + datePost.getMinutes()).slice(-2);
  //   console.log(`Дата и время создания документа: ${formatted_date}`);


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
