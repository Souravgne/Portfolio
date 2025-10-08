// controllers/experienceController.js
import Experience from "../models/Experience.js";

// Create
export const createExperience = async (req, res) => {
  try {
    const experience = new Experience({
      ...req.body,
      createdBy: req.user.userId,
    });
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: "Error creating experience", error });
  }
};

// Read All (for logged-in user)
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ createdBy: req.user.userId });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences", error });
  }
};

// Update
export const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    res.json(exp);
  } catch (error) {
    res.status(500).json({ message: "Error updating experience", error });
  }
};

// Delete
export const deleteExperience = async (req, res) => {
  try {
    await Experience.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting experience", error });
  }
};
