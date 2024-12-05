import { auth } from "../firebase";
import { MessageType } from "./types";

const Message = ({ message }: { message: MessageType }) => {
  const user = auth.currentUser;

  return (
    <div
      className={`flex items-start mb-5 gap-4 ${
        message.uid === user?.uid ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      <img
        className="w-10 h-10 rounded-full"
        src={message.avatar}
        alt="user avatar"
      />
      <div
        className={`max-w-[80%] p-4 rounded-lg shadow-md ${
          message.uid === user?.uid
            ? "bg-blue-500 text-white rounded-br-[20px] rounded-bl-[20px]"
            : "bg-[#7cc5d9] text-[#1c2c4c] rounded-bl-[20px] rounded-br-[0px]"
        }`}
      >
        <p className="font-semibold text-sm mb-2">{message.name}</p>
        <p className="break-words">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
