// models/Experience.js
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  description: String,
  duration: {
    from: { type: Date },
    to: { type: Date },
  },
  techStack: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
