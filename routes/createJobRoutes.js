import express from "express";
const router = express.Router();
import {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
} from "../controllers/createJobController.js";

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

export default router;
