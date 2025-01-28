import express from "express";
const router = express.Router();
import {
  createHackathon,
  getHackathon,
  getAllHackathons,
  updateHackathon,
  deleteHackathon,
} from "../controllers/hackathonController.js";

// Create a new Hackathon
router.post("/", createHackathon);

// Get a Hackathon by ID
router.get("/:id", getHackathon);

// Get all Hackathons
router.get("/", getAllHackathons);

// Update Hackathon by ID
router.put("/:id", updateHackathon);

// Delete Hackathon by ID
router.delete("/:id", deleteHackathon);

export default router;
