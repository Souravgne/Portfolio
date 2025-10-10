import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
