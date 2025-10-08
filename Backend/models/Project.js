// models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    techStack: [String],
    tags: String,
    githubLink: String,
    liveLink: String,
    additionalInfo: String,
    thumbnailUrl: String, // uploaded image path
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
