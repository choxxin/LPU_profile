import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustamd/useConversations";

import Incomesound from "../assets/Sound/button.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (selectedConversation._id != "meow") {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;

        const soundoutgoing = new Audio(Incomesound);

        soundoutgoing.play();

        setMessages([...messages, newMessage]);
      });
    } else {
      socket?.on("groupmessage", (newMessage) => {
        newMessage.shouldShake = true;

        const soundoutgoing = new Audio(Incomesound);

        soundoutgoing.play();

        setMessages([...messages, newMessage]);
      });
    }

    return () => {
      socket?.off("newMessage");
      socket?.off("groupmessage");
    };
  }, [socket, setMessages, messages, selectedConversation]);
};
export default useListenMessages;
