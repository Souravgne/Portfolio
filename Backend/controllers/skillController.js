import Skill from "../models/Skill.js";

// CREATE
export const createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

    const skill = new Skill({
      name,
      thumbnail,
      createdBy: req.user.userId,
    });

    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Error creating skill", error });
  }
};

// READ
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ createdBy: req.user.userId });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills", error });
  }
};

// UPDATE
export const updateSkill = async (req, res) => {
  try {
    const updateData = { name: req.body.name };
    if (req.file) updateData.thumbnail = `/uploads/${req.file.filename}`;

    const updatedSkill = await Skill.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      updateData,
      { new: true }
    );

    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
};

// DELETE
export const deleteSkill = async (req, res) => {
  try {
    await Skill.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
};
