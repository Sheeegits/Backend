import express from "express";
const router = express.Router();
import {
  createOnCampusRequest,
  getOnCampusRequest,
  getAllOnCampusRequests,
  updateOnCampusRequest,
  deleteOnCampusRequest,
} from "../controllers/onCampusRequestController.js";

// Create a new OnCampusRequest
router.post("/", createOnCampusRequest);

// Get OnCampusRequest by ID
router.get("/:id", getOnCampusRequest);

// Get all OnCampusRequests
router.get("/", getAllOnCampusRequests);

// Update OnCampusRequest by ID
router.put("/:id", updateOnCampusRequest);

// Delete OnCampusRequest by ID
router.delete("/:id", deleteOnCampusRequest);

export default router;
