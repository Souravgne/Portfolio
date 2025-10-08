// routes/skillsRoutes.js
import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("thumbnail"), createSkill);
router.get("/", authMiddleware, getSkills);
router.put("/:id", authMiddleware, upload.single("thumbnail"), updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

export default router;
