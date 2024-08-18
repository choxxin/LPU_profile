"use client";
import UserProfile from "../components/sidebar";
import Leetcode from "@/components/leetcode";
import Image from "next/image";
import { useState } from "react";
import {
  loginUser,
  getUserDetails,
  handleleetcodeprofile,
  getProfileByRegistrationNumber,
} from "../app/api/umsinfo";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import UserList from "@/components/userList";
import Lapuinfo from "@/components/lapuinfo";
import Announcements from "@/components/Announcements";
export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/4 w-full bg-gray-300">
        <UserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      </div>
      <div className="lg:w-3/4 w-full flex-grow p-4">
        {selectedUser ? (
          <Lapuinfo registrationNumber={selectedUser.registrationNumber} />
        ) : (
          <div className="text-center text-gray-600">
            Select a user to view their profile.
          </div>
        )}
      </div>
    </div>
  );
}
