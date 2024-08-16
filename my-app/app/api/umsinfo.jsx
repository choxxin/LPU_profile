"use server";
import axios from "axios";
import { connectToDB } from "../../utils/database";
import User from "../../models/user";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_UMS_API_BASE_URL ||
  " http://localhost:8000/api/v1/user";

export const loginUser = async (reg_no, password) => {
  try {
    await connectToDB(); // Connect to the database
    // Make the login request to the API
    const response = await axios.post(`${API_BASE_URL}/login`, {
      reg_no,
      password,
    });

    // Check if the login was successful
    if (response.status === 200) {
      const { cookie } = response.data;

      // Check if the user already exists in the database
      let user = await User.findOne({ registrationNumber: reg_no });

      if (!user) {
        // If the user doesn't exist, create a new user in the database
        user = new User({
          registrationNumber: reg_no,
          password: password, // You may want to hash the password before saving it
          cookie: cookie,
        });
        await user.save(); // Save the user to the database
      } else {
        // If the user exists, update their cookie
        user.cookie = cookie;
        await user.save(); // Update the user in the database
      }
    }

    return response.data; // Return the response data
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const getUserDetails = async (reg_no, password, cookie) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/me`, {
      reg_no,
      password,
      cookie,
    });
    return response.data;
  } catch (error) {
    console.error("Get User Details Error:", error);
    throw error;
  }
};
export const handleleetcodeprofile = async (leetusername) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/${leetusername}/solved`
    );
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
