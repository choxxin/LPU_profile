"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./sidebar";

const UserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(false);
  // console.log("users", users);

  users.map((user) => console.log("user", user));

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/getalluser");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {Loading ? (
        <div className="flex w-72 min-h-52 flex-col gap-4 ml-10">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ) : (
        <div className=" ml-6  gap-4 sm:grid-cols-2 lg:grid-cols-3 flex flex-col bg-gray-300 w-80 min-w-52 min-h-16 dark:bg-slate-600 ">
          {users.map((user) => (
            <div key={user._id} onClick={() => onSelectUser(user)}>
              <UserProfile
                key={user._id}
                name={user.name}
                avatarUrl={user.profile_image}
                regNo={user.registrationNumber}
                selected={selectedUser && selectedUser._id === user._id}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
