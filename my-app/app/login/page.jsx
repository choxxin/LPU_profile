"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { loginUser, getUserDetails } from "../api/umsinfo";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Login() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const loginData = await loginUser(username, password);
      const cookie = loginData.cookie;
      // Store the cookie in the browser
      Cookies.set("session", cookie, { path: "/" });

      console.log("Login successful and cookie stored:", cookie);

      console.log("Login Data:", loginData); // Debugging step
      toast.success("Login Successful");
      router.push("/"); // Redirect to home page after successful login
      const userDataRaw = await getUserDetails(username, password, cookie);
      const userData = userDataRaw.toObject
        ? userDataRaw.toObject()
        : userDataRaw;
      // console.log(userData);
    } catch (error) {
      toast.error("Login failed");
      console.log("Login Error:", error);
    } finally {
      setloading(false);
    }
    // Handle login logic here, such as API calls
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login to Lpu profile
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Registeration number
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="loading loading-infinity loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
