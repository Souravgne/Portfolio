const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

router.post("/", authMiddleware, upload.single("thumbnail"), createSkill);
router.get("/", authMiddleware, getSkills);
router.put("/:id", authMiddleware, upload.single("thumbnail"), updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;
