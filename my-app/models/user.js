import mongoose from "mongoose";
import Profile from "./profile";
const { Schema, model, models } = mongoose;
const CourseSchema = new Schema({
  course_code: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  facultyname: {
    type: String,
  },
  credits: {
    type: Number,
    required: true,
  },
});

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
  themetop: {
    type: String, // Add this field if
    default: "gradient-profile",
  },
  themedown: {
    type: String, // Add this field if
    default: "gradient-profile",
  },
  courses: [CourseSchema],
});

const User = models.User || model("User", UserSchema);

export default User;
