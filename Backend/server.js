import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userDetailsRoutes from "./routes/userDetailsRoutes.js";
import socialRoutes from "./routes/socialRoute.js";
import skillsRoutes from "./routes/skillsRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";

// Initialize
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/userDetails", userDetailsRoutes);

// Newly added routes
app.use("/api/socials", socialRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Portfolio API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
