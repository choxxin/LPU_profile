"use client";
import UserProfile from "../components/sidebar";
import Image from "next/image";
import { useState } from "react";
import {
  loginUser,
  getUserDetails,
  handleleetcodeprofile,
} from "../app/api/umsinfo";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import UserList from "@/components/userList";
export default function Home() {
  const [user, setUser] = useState(null);
  const [registration_number, setregistration_number] = useState("");
  const [password, setPassword] = useState("");
  const [leetcode, setleetcode] = useState("");
  const [leetusername, setleetusername] = useState(null);
  const handleLogin = async () => {
    try {
      const loginData = await loginUser(registration_number, password);
      const cookie = loginData.cookie;
      // Store the cookie in the browser
      Cookies.set("session", cookie, { path: "/" });

      console.log("Login successful and cookie stored:", cookie);

      console.log("Login Data:", loginData); // Debugging step
      toast.success("Login Successful");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleuserdetail = async () => {
    const sessionCookie = Cookies.get("session");
    try {
      const userDetails = await getUserDetails(
        registration_number,
        password,
        sessionCookie
      );
      setUser(userDetails);
      console.log("User Details:", userDetails); // Debugging step
    } catch (error) {
      console.error("Get User Details Error:", error);
    }
  };
  const leetcodefunction = async () => {
    try {
      const leetcodeprofile = await handleleetcodeprofile(leetusername);
      console.log("leetcodeprofile:", leetcodeprofile); // Debugging step
      setleetcode(leetcodeprofile);
      toast.success("Leetcode Profile fetched successfully");
    } catch (error) {
      console.error("Get User Details Error:", error);
      toast.error("Leetcode Profile fetch failed");
    }
  };

  const handleusername = (event) => {
    setregistration_number(event.target.value);
  };
  const handlepassword = (event) => {
    setPassword(event.target.value);
  };
  const handleleetcode = (event) => {
    setleetusername(event.target.value);
  };

  return (
    <div className="m-5 py-11">
      <h1>Welcome to LPU UMS</h1>

      <button
        className="btn btn-primary bg-black text-white rounded-xl w-14"
        onClick={handleLogin}
      >
        Login
      </button>
      <UserList />
      <br />
      <button onClick={handleuserdetail}>Get details</button>
      <div className="py-5 ">
        <Input
          className="min-w-7"
          onChange={handleusername}
          placeholder="Registration Number"
        />
        <Input
          type="password"
          onChange={handlepassword}
          placeholder="Password"
        />
      </div>

      {user ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Program: {user.program}</p>
          <p>Section:{user.section}</p>
          <p>Registration Number: {user.registration_number}</p>
          <Image
            src={user.profile_image}
            alt="User Image"
            width={200}
            height={200}
          />
          {/* <UserProfile
            name={user.name}
            avatarUrl={user.profile_image}
            regNo={user.registration_number}
          /> */}

          {/* Display more user details */}
        </div>
      ) : (
        <div>
          <h2>Login successful!</h2>

          <p>Please wait while we retrieve your user details...</p>
          <Input placeholder="leetcode profile" onChange={handleleetcode} />
          <button onClick={leetcodefunction}>Get leetcode</button>
          {leetcode ? (
            <div>
              Total problem solved: {leetcode.solvedProblem}
              <br />
              Easy solved: {leetcode.easySolved}
              <br />
              {/* Calculate the percentage of easy problems solved */}
              <div
                className="radial-progress"
                style={{
                  "--value": leetcode.solvedProblem
                    ? (leetcode.easySolved / leetcode.solvedProblem) * 100
                    : 0,
                }}
                role="progressbar"
              >
                {/* Display the percentage inside the radial progress bar */}
                {(leetcode.solvedProblem
                  ? (leetcode.easySolved / leetcode.solvedProblem) * 100
                  : 0
                ).toFixed(2)}
                %
              </div>
              <br />
              Medium solved: {leetcode.mediumSolved}
              <br />
              {/* Calculate the percentage of medium problems solved */}
              <div
                className="radial-progress"
                style={{
                  "--value": leetcode.solvedProblem
                    ? (leetcode.mediumSolved / leetcode.solvedProblem) * 100
                    : 0,
                }}
                role="progressbar"
              >
                {(leetcode.solvedProblem
                  ? (leetcode.mediumSolved / leetcode.solvedProblem) * 100
                  : 0
                ).toFixed(2)}
                %
              </div>
              <br />
              Hard solved: {leetcode.hardSolved}
              <br />
              {/* Calculate the percentage of hard problems solved */}
              <div
                className="radial-progress"
                style={{
                  "--value": leetcode.solvedProblem
                    ? (leetcode.hardSolved / leetcode.solvedProblem) * 100
                    : 0,
                }}
                role="progressbar"
              >
                {(leetcode.solvedProblem
                  ? (leetcode.hardSolved / leetcode.solvedProblem) * 100
                  : 0
                ).toFixed(2)}
                %
              </div>
              <div />
            </div>
          ) : (
            <div>NO DATA </div>
          )}
        </div>
      )}
    </div>
  );
}
