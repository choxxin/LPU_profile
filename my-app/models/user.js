import mongoose from "mongoose";
import Profile from "./profile";
const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  profile_image: {
    type: String,
  },
  leetcode_username: {
    type: String,
  },
  registrationNumber: {
    type: String,
    required: [true, "Registration number is required"],
    unique: [true, "Registration number already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  cookie: {
    type: String, // Add this field if storing the cookie
  },
});

const User = models.User || model("User", UserSchema);

export default User;
