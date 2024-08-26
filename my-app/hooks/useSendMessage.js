import React from "react";
import useConversation from "../../my-app/zustand/useconservation";
import toast from "react-hot-toast";
import { useState } from "react";
import useUserStore from "../../my-app/store/useUserStore";
function useSendMessage() {
  const [Loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { id } = useUserStore();
  const sendMessage = async (message) => {
    setLoading(true);
    const normalchat = `/api/messages/send/${selectedConversation}`;
    // const groupchat = "/api/messages/groupsend";
    try {
      let res;

      res = await fetch(normalchat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, senderId: id }),
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
