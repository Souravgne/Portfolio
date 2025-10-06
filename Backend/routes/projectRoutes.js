const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getAllProjects,
} = require("../controllers/projectController");

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

module.exports = router;
