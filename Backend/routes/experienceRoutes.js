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

router.post("/", createExperience);
router.get("/", getExperiences);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;
