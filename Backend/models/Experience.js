const mongoose = require("mongoose");

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

module.exports = mongoose.model("Experience", experienceSchema);
