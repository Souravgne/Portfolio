import Social from "../models/Social.js";

// ✅ Create Social
export const createSocial = async (req, res) => {
  try {
    const newSocial = new Social(req.body);
    console.log("Creating Social:", newSocial);
    const saved = await newSocial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get All Socials
export const getAllSocials = async (req, res) => {
  try {
    const socials = await Social.find().sort({ createdAt: -1 });
    res.status(200).json(socials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get Single Social
export const getSocialById = async (req, res) => {
  try {
    const social = await Social.findById(req.params.id);
    if (!social) return res.status(404).json({ message: "Social not found" });
    res.status(200).json(social);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Social
export const updateSocial = async (req, res) => {
  try {
    const updated = await Social.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Social not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete Social
export const deleteSocial = async (req, res) => {
  try {
    const deleted = await Social.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Social not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
