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
// Middleware to remove the associated profile before deleting a user
// UserSchema.pre("findOneAndDelete", async function (next) {
//   const user = await this.model.findOne(this.getFilter());

//   if (user) {
//     await Profile.findOneAndDelete({ user: user._id });
//   }

//   next();
// });

// Check if the model already exists to avoid redefinition
const User = models.User || model("User", UserSchema);

export default User;
