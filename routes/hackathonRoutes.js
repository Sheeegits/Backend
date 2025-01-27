const express = require("express");
const router = express.Router();
const {
  createHackathon,
  getHackathon,
  getAllHackathons,
  updateHackathon,
  deleteHackathon,
} = require("../controllers/hackathonController");

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

module.exports = router;
