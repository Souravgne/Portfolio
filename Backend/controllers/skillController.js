import Skill from "../models/Skill.js";

const FIXED_USER_ID = "portfolio-user";

// CREATE
export const createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

    const skill = new Skill({
      name,
      thumbnail,
      createdBy: FIXED_USER_ID,
    });

    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating skill", error });
  }
};

// READ
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ createdBy: FIXED_USER_ID });
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching skills", error });
  }
};

// UPDATE
export const updateSkill = async (req, res) => {
  try {
    const updateData = { name: req.body.name };
    if (req.file) updateData.thumbnail = `/uploads/${req.file.filename}`;

    const updatedSkill = await Skill.findOneAndUpdate(
      { _id: req.params.id, createdBy: FIXED_USER_ID },
      updateData,
      { new: true }
    );

    if (!updatedSkill)
      return res.status(404).json({ message: "Skill not found" });

    res.json(updatedSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating skill", error });
  }
};

// DELETE
export const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findOneAndDelete({
      _id: req.params.id,
      createdBy: FIXED_USER_ID,
    });

    if (!deleted)
      return res.status(404).json({ message: "Skill not found" });

    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting skill", error });
  }
};
