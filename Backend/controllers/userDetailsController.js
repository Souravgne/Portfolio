const UserDetails = require("../models/UserDetails");
const path = require("path");
const fs = require("fs");

// ✅ Create or Update User Details
exports.createOrUpdateUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const { fullName, email, phone, address, bio } = req.body;

    const updateData = {
      fullName,
      email,
      phone,
      address,
      bio,
    };

    // handle files
    if (req.files) {
      if (req.files.profileImage) {
        updateData.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
      }
      if (req.files.resume) {
        updateData.resume = `/uploads/${req.files.resume[0].filename}`;
      }
    }

    const userDetails = await UserDetails.findOneAndUpdate(
      { user: userId },
      updateData,
      { new: true, upsert: true }
    );

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get User Details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await UserDetails.findOne({ user: userId });
    if (!userDetails)
      return res.status(404).json({ message: "User details not found" });
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete User Details
exports.deleteUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await UserDetails.findOneAndDelete({ user: userId });

    if (!userDetails)
      return res.status(404).json({ message: "User details not found" });

    res.status(200).json({ message: "User details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Users (Admin use)
exports.getAllUserDetails = async (req, res) => {
  try {
    const allUsers = await UserDetails.find().populate("user", "email");
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
