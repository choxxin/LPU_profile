import { useState, useEffect } from "react";
import axios from "axios";

const RecentChats = ({ userId }) => {
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    // Fetch recent chats on component mount
    const fetchRecentChats = async () => {
      try {
        const response = await axios.get(`/api/messages/recent/${userId}`);
        setRecentChats(response.data);
      } catch (error) {
        console.error("Failed to fetch recent chats:", error);
      }
    };

    fetchRecentChats();
  }, [userId]);

  return (
    <div className="recent-chats p-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Chats</h2>
      <ul className="space-y-4">
        {recentChats.map((chat, index) => (
          <li key={index} className="chat-item flex items-center space-x-4">
            <img
              src={chat.senderId.profile_image}
              alt={`${chat.senderId.name}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">{chat.senderId.name}</span>
            {/* Red dot indicator for unread messages */}
            {!chat.isRead && (
              <span className="ml-auto w-3 h-3 rounded-full bg-red-500"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChats;
