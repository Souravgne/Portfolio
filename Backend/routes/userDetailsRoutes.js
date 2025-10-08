// routes/userDetailsRoutes.js
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  createOrUpdateUserDetails,
  getUserDetails,
  deleteUserDetails,
  getAllUserDetails,
} from "../controllers/userDetailsController.js";

const router = express.Router();

// Get current user details
router.get("/", getUserDetails);

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
router.get("/all", getAllUserDetails);

export default router;
