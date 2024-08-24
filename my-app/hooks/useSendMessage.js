import React from "react";
import useConversation from "../zustamd/useConversations";
import toast from "react-hot-toast";
import { useState } from "react";
function useSendMessage() {
  const [Loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    const normalchat = `${process.env.BASE_URL}/api/messages/send/${selectedConversation._id}`;
    // const groupchat = "/api/messages/groupsend";
    try {
      let res;

      res = await fetch(normalchat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, Loading };
}

export default useSendMessage;
