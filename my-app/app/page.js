"use client";
import UserProfile from "../components/sidebar";
import Leetcode from "@/components/leetcode";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
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
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      {/* <nav className="bg-blue-600 text-white p-4" */}
      <div className="navbar bg-base-100 min-h-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl hidden md:inline-block">
            LPU PROFILE
          </a>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png"
            height={80}
            width={80}
          ></img>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/announcements">Nav1</Link>
            </li>
            <li>
              <details className="group ">
                <summary className="cursor-pointer select-none hover:text-blue-500">
                  Announcements
                </summary>
                <div
                  className="absolute left-0 mt-2 min-w-[630px] min-h-96   shadow-lg h-full w-full bg-sky-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-900
"
                >
                  <Announcements />
                </div>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/* <a className="btn">Button</a> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-slate-200"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="lg:w-1/4 w-full bg-gray-300">
          <UserList
            onSelectUser={setSelectedUser}
            selectedUser={selectedUser}
          />
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
    </div>
  );
}
