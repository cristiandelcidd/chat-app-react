import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";

import { auth, db } from "../firebase";
import { SendMessageProps } from "./types";

const SendMessage = ({ scroll }: SendMessageProps) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    if (!auth.currentUser) {
      alert("You must be logged in to send a message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage("");

    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={(event) => sendMessage(event)}
      className="fixed bottom-0 left-0 w-full p-4 bg-slate-600 flex items-center space-x-4"
    >
      <label htmlFor="messageInput" className="sr-only">
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="w-full h-12 px-4 py-2 rounded-lg bg-white text-[#1c2c4c] placeholder-[#aaa] focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoComplete="off"
      />
      <button
        type="submit"
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
