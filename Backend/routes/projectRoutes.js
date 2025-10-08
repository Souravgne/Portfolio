// routes/projectRoutes.js
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getAllProjects,
} from "../controllers/projectController.js";

const router = express.Router();

// ✅ Get all projects of logged-in user
router.get("/", authMiddleware, getProjects);

// ✅ Create a project
router.post("/", authMiddleware, upload.single("thumbnail"), createProject);

// ✅ Update project
router.put("/:id", authMiddleware, upload.single("thumbnail"), updateProject);

// ✅ Delete project
router.delete("/:id", authMiddleware, deleteProject);

// ✅ Admin: Get all projects
router.get("/all", authMiddleware, getAllProjects);

export default router;
