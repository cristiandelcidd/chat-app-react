import { useEffect, useRef, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { MessageType } from "./types";

const ChatBox = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scroll = useRef<HTMLElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (QuerySnapshot: QuerySnapshot<DocumentData>) => {
        const fetchedMessages: MessageType[] = [];

        QuerySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id } as MessageType);
        });

        const sortedMessages = fetchedMessages.sort(
          (a, b) => a.createdAt - b.createdAt
        );

        setMessages(sortedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="flex flex-col bg-[#1c2c4c] text-[#4c768d] px-4 pt-28">
      <div className="pb-20 ">
        <div className="">
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>

      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
