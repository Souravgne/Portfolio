// controllers/projectController.js
import Project from "../models/Project.js";

// ✅ Create a new project
export const createProject = async (req, res) => {
  try {
    console.log("Request body:", req.user?.userId);
    const userId = req.user?.userId;
    console.log("Creating project for user ID:", userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const {
      title,
      description,
      techStack,
      tags,
      githubLink,
      liveLink,
      additionalInfo,
    } = req.body;

    const project = new Project({
    user: userId,
    title,
    description,
    techStack: techStack?.split(",").map((t) => t.trim()) || [],
    tags,
    githubLink,
    liveLink,
    additionalInfo,
    });


    // 🛑 Defensive check
    if (req.file?.filename) {
    project.thumbnailUrl = `/uploads/${req.file.filename}`;
  }


    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error("🔥 Error in createProject:", err);
    res.status(500).json({
      message: "Error creating project",
      error: err.message,
    });
  }
};


// ✅ Get all projects for current user
export const getProjects = async (req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// ✅ Update project
export const updateProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;
    const updates = { ...req.body };

    if (updates.techStack) {
      updates.techStack = updates.techStack.split(",").map((t) => t.trim());
    }

    if (req.file) {
      updates.thumbnailUrl = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findOneAndUpdate(
      { _id: projectId, user: userId },
      updates,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error updating project" });
  }
};

// ✅ Delete project
export const deleteProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const project = await Project.findOneAndDelete({
      _id: projectId,
      user: userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project" });
  }
};

// ✅ Admin: Get all projects (optional)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all projects" });
  }
};
