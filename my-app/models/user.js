import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  profile_image: {
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

// Check if the model already exists to avoid redefinition
const User = models.User || model("User", UserSchema);

export default User;
