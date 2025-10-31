// controllers/experienceController.js
import Experience from "../models/Experience.js";

const FIXED_USER_ID = "portfolio-user";

// Helper to get userId (from req.user or fallback to fixed)
const getUserId = (req) => req.user?.userId || FIXED_USER_ID;

// Create a new experience
export const createExperience = async (req, res) => {
  try {
    const experience = new Experience({
      ...req.body,
      createdBy: getUserId(req),
    });
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    console.error("Create Experience Error:", error);
    res.status(500).json({ message: "Failed to create experience", error });
  }
};

// Get all experiences for the logged-in user
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ createdBy: getUserId(req) });
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Get Experiences Error:", error);
    res.status(500).json({ message: "Failed to fetch experiences", error });
  }
};

// Update an experience by ID
export const updateExperience = async (req, res) => {
  try {
    const updatedExp = await Experience.findOneAndUpdate(
      { _id: req.params.id, createdBy: getUserId(req) },
      req.body,
      { new: true }
    );
    if (!updatedExp) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(updatedExp);
  } catch (error) {
    console.error("Update Experience Error:", error);
    res.status(500).json({ message: "Failed to update experience", error });
  }
};

// Delete an experience by ID
export const deleteExperience = async (req, res) => {
  try {
    const deletedExp = await Experience.findOneAndDelete({
      _id: req.params.id,
      createdBy: getUserId(req),
    });

    if (!deletedExp) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.error("Delete Experience Error:", error);
    res.status(500).json({ message: "Failed to delete experience", error });
  }
};
