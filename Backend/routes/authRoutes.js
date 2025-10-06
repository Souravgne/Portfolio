import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Register admin
router.post("/register", register);

// Login admin
router.post("/login", login);

export default router; // <-- default export
