const express = require("express");
const router = express.Router();
const {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Create a new Job
router.post("/", createJob);

// Get Job by ID
router.get("/:id", getJob);

// Get all Jobs
router.get("/", getAllJobs);

// Update Job by ID
router.put("/:id", updateJob);

// Delete Job by ID
router.delete("/:id", deleteJob);

module.exports = router;
