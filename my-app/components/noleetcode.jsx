import React from "react";
import { useState } from "react";
import axios from "axios";
// File: path/to/your/usageFile.js

import { updateLeetcodeUsername } from "../app/api/umsinfo";

const NOLeetcode = ({ reg_no, onProfileSaved }) => {
  const [username, setusername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setusername(event.target.value);
  };
  const registerOnLeetcode = async () => {
    if (username && reg_no) {
      try {
        setLoading(true);
        setError(null);

        const updatedUser = await updateLeetcodeUsername(reg_no, username);
        console.log(updatedUser);

        if (onProfileSaved) {
          onProfileSaved();
        }

        // Fetch the LeetCode profile details
      } catch (error) {
        console.error("Error saving or fetching LeetCode profile:", error);
        setError("Failed to fetch profile details.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex flex-col min-w-64 md:flex-row gap-10    border-black border-2 ">
      <div
        className="hero min-h-96 "
        style={{
          backgroundImage:
            "url(https://leetcode.com/static/images/LeetCode_Sharing.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center ">
          <div className="max-w-md">
            <div className=" p-4 border-2 border-black   min-h-72 w-full bg-purple-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  ">
              <h1 className="mb-5 text-slate-300 text-5xl font-bold">
                Register Yourself
              </h1>
              <p className="text-gray-300 text-xl text-bold">
                Leetcode Profile
              </p>
              <input
                type="text"
                onChange={handleUsernameChange}
                placeholder="Type here"
                style={{ color: "black" }}
                className="input input-bordered w-full max-w-xs"
              />
              <button
                onClick={registerOnLeetcode}
                className="btn btn-primary mt-20"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NOLeetcode;
