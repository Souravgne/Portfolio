// routes/experienceRoute.js
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

router.post("/", authMiddleware, createExperience);
router.get("/", authMiddleware, getExperiences);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;
