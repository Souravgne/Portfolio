const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
  createOrUpdateUserDetails,
  getUserDetails,
  deleteUserDetails,
  getAllUserDetails,
} = require("../controllers/userDetailsController");

// Get current user details
router.get("/", authMiddleware, getUserDetails);

// Create or update details
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  createOrUpdateUserDetails
);

// Delete user details
router.delete("/", authMiddleware, deleteUserDetails);

// Admin: get all users’ details
router.get("/all", authMiddleware, getAllUserDetails);

module.exports = router;
