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

router.post("/", upload.single("thumbnail"), createSkill);
router.get("/", getSkills);
router.put("/:id", upload.single("thumbnail"), updateSkill);
router.delete("/:id", deleteSkill);

export default router;
