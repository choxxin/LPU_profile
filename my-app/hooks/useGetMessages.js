import React, { useEffect, useState } from "react";
import useConversation from "../zustamd/useConversations";
import toast from "react-hot-toast";

function useGetMessages() {
  const [Loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      const normalchat = `/api/messages/${selectedConversation._id}`;
      const groupchat = "/api/messages/grouprec";
      try {
        let response;
        if (selectedConversation._id === "meow") {
          response = await fetch(groupchat, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
        } else {
          response = await fetch(normalchat);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessage(); //prevent the app to crash
  }, [selectedConversation?._id, setMessages]);

  return { messages, Loading };
}

export default useGetMessages;
