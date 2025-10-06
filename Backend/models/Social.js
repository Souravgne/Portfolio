import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    thumbnail: { type: String }, // store image URL or base64
  },
  { timestamps: true }
);

export default mongoose.model("Social", socialSchema);
