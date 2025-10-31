import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String },
  createdBy: { type: String, required: true },
});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
