// models/UserDetails.js
import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
  _id: {
    type: String, 
    required: true
  },
  fullName: String,
  email: String,
  phone: String,
  address: String,
  bio: String,
  profileImage: String,
  resume: String
});

export default mongoose.model("UserDetails", userDetailsSchema);
