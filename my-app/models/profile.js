// models/profile.js
import { Schema, model, models } from "mongoose";
// import User from "./user"; // Import the User model

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true,
  },
  skills: [String],
  experience: [
    {
      title: String,
      company: String,
      description: String,
      from: Date,
      to: Date,
      current: Boolean,
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      from: Date,
      to: Date,
      current: Boolean,
    },
  ],
});

const Profile = models.Profile || model("Profile", ProfileSchema);
export default Profile;
