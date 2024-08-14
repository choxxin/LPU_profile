"use client";
import { useState } from "react";
import { loginUser } from "../app/api/umsinfo";

export default function Home() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const loginData = await loginUser("12307086", "12aAA12!");

      console.log("Login Data:", loginData); // Debugging step

      if (loginData) {
        //   const userDetails = await getUserDetails(
        //     "your_reg_no",
        //     "your_password"
        //   );
        //   console.log("User Details:", userDetails); // Debugging step

        // Assuming loginData contains user information like name, program, etc.
        setUser(loginData);
      } else {
        console.error("Login failed: No data returned");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to LPU UMS</h1>
      <button onClick={handleLogin}>Login</button>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.name}</p>
          <p>Program: {user.program}</p>
          {/* Display more user details */}
        </div>
      ) : (
        <div>
          <h2>Login successful!</h2>
          <p>Please wait while we retrieve your user details...</p>
        </div>
      )}
    </div>
  );
}
