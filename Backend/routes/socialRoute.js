import express from "express";
import {
  createSocial,
  getAllSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
} from "../controllers/socialController.js";

const router = express.Router();

router.post("/", createSocial);
router.get("/", getAllSocials);
router.get("/:id", getSocialById);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

export default router;
