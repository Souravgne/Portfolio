// models/UserDetails.js
import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      unique: true,
    },
    fullName: String,
    email: String,
    phone: String,
    address: String,
    bio: String,
    profileImage: String, 
    resume: String,
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
export default UserDetails;
