// controllers/userDetailsController.js
import UserDetails from "../models/UserDetails.js";
import path from "path";
import fs from "fs";

// We'll use a single fixed ID (can be any string or a constant)
// This avoids relying on authentication
const FIXED_USER_ID = "portfolio-user";


// ✅ Create or Update User Details (single user)
export const createOrUpdateUserDetails = async (req, res) => {
  try {
    const { fullName, email, phone, address, bio } = req.body;

    const updateData = { fullName, email, phone, address, bio };

    // Handle uploaded files (profile image and resume)
    if (req.files) {
      if (req.files.profileImage) {
        updateData.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
      }
      if (req.files.resume) {
        updateData.resume = `/uploads/${req.files.resume[0].filename}`;
      }
    }

    const userDetails = await UserDetails.findOneAndUpdate(
      { _id: FIXED_USER_ID },      // Use fixed ID
      updateData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get User Details (single user)
export const getUserDetails = async (req, res) => {
  try {
    const userDetails = await UserDetails.findById(FIXED_USER_ID);
    if (!userDetails) {
      return res.status(404).json({ message: "User details not found" });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Delete User Details (if needed)
export const deleteUserDetails = async (req, res) => {
  try {
    const userDetails = await UserDetails.findByIdAndDelete(FIXED_USER_ID);
    if (!userDetails) {
      return res.status(404).json({ message: "User details not found" });
    }
    res.status(200).json({ message: "User details deleted successfully" });
  } catch (error) {
    console.error("Error deleting user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
