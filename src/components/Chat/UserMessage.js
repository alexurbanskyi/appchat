import "./userMessage.css";
import { auth } from "../../firebase-config";

function UserMessage({ message }) {
  const author = auth.currentUser.displayName;
  console.log(author);
  
  let sec = 0;
  message.createdAt ? (sec = message.createdAt) : (sec = 0);
  //console.log('SEC --->', sec)
  const datePost = new Date(sec.seconds * 1000);
  const formatted_date =
    ("0" + (datePost.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + datePost.getDate()).slice(-2) +
    " " +
    ("0" + datePost.getHours()).slice(-2) +
    ":" +
    ("0" + datePost.getMinutes()).slice(-2);
  //console.log('formatted_date',formatted_date)

  return (
    <div className="message_container">
      <p className={!(author === message.user) ? 'message_author' : ['message_author', 'message_ouner'].join(' ')}>{message.user}</p>
      <p className={!(author === message.user) ? 'message_text' : ['message_text', 'message_ouner'].join(' ')}>{message.text}</p>
      <p className={!(author === message.user) ? 'message_time' : ['message_time', 'message_ouner'].join(' ')}>{formatted_date}</p>
    </div>
  );
}

export default UserMessage;
