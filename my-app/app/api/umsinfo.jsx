"use server";
import axios from "axios";
import { connectToDB } from "../../utils/database";
import User from "../../models/user";
import Profile from "@/models/profile";
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

// export const getUserDetails = async (reg_no, password, cookie) => {
//   try {
//     const user = await User.findOne(reg_no, password);

//     if (!user) {
//       const response = await axios.post(`${API_BASE_URL}/me`, {
//         reg_no,
//         password,
//         cookie,
//       });

//       return response.data;
//     } else {
//       const userProfile = await Profile.findOne({ user: user._id }).populate(
//         "user"
//       );
//       if (!userProfile) {
//         throw new Error("User profile not found.");
//       }

//       return userProfile;
//     }
//   } catch (error) {
//     console.error("Get User Details Error:", error);
//     throw error;
//   }
// };

export const getUserDetails = async (reg_no, password, cookie) => {
  try {
    // Find the user by registration number and password
    const user = await User.findOne({ registrationNumber: reg_no });

    if (!user) {
      throw new Error("User not found. Please log in first.");
    }
    if (!user.name || !user.profile_image) {
      // Fetch the user's name from the external API
      const response = await axios.post(`${API_BASE_URL}/me`, {
        reg_no,
        password,
        cookie,
      });

      const userData = response.data;

      // Update the user's name in the MongoDB
      user.name = userData.name; // Assuming the API returns the name
      user.profile_image = userData.profile_image; // Assuming the API returns the profile image URL
      await user.save(); // Save the updated user document
    }

    // Check if the profile exists in the database
    let userProfile = await Profile.findOne({ user: user._id })
      .populate("user")
      .lean();
    //lean helps to convert raw data in js obj

    if (!userProfile) {
      // If the profile doesn't exist, fetch the data from the API
      const response = await axios.post(`${API_BASE_URL}/me`, {
        reg_no,
        password,
        cookie,
      });

      const userData = response.data;

      // Create a new profile in the database
      userProfile = new Profile({
        user: user._id, // Reference the existing user
        program: userData.program,
        section: userData.section,
        cgpa: userData.cgpa,
        roll_number: userData.roll_number,
        agg_attendance: userData.agg_attendance,
      });

      await userProfile.save(); // Save the profile to the database
    }

    return userProfile; // Return the profile data
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
