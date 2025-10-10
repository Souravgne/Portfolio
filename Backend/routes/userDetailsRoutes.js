import express from "express";
import multer from "multer";
import {
  createOrUpdateUserDetails,
  getUserDetails,
  deleteUserDetails
} from "../controllers/userDetailsController.js";

const router = express.Router();

// Setup Multer for file uploads
const upload = multer({ dest: "uploads/" });

router.get("/", getUserDetails);

router.post(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 }
  ]),
  createOrUpdateUserDetails
);

router.delete("/", deleteUserDetails);

export default router;
