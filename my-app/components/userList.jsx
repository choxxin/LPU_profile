"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./sidebar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  // console.log("users", users);

  users.map((user) => console.log("user", user));

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/getalluser");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-blue-700 w-full min-h-16 ">
      {users.map((user) => (
        <UserProfile
          key={user._id}
          name={user.name}
          avatarUrl={user.profile_image}
          regNo={user.registrationNumber}
        />
      ))}
    </div>
  );
};

export default UserList;
