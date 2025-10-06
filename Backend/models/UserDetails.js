const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: true,
      unique: true,
    },
    fullName: String,
    email: String,
    phone: String,
    address: String,
    bio: String,
    profileImage: String, // file path or URL
    resume: String, // file path or URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDetails", userDetailsSchema);
