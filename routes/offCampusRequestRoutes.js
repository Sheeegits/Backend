import express from "express";
const router = express.Router();
import {
  createOffCampusRequest,
  getOffCampusRequest,
  getAllOffCampusRequests,
  updateOffCampusRequest,
  deleteOffCampusRequest,
} from "../controllers/offCampusRequestController.js";

// Create a new OffCampusRequest
router.post("/", createOffCampusRequest);

// Get OffCampusRequest by ID
router.get("/:id", getOffCampusRequest);

// Get all OffCampusRequests
router.get("/", getAllOffCampusRequests);

// Update OffCampusRequest by ID
router.put("/:id", updateOffCampusRequest);

// Delete OffCampusRequest by ID
router.delete("/:id", deleteOffCampusRequest);

export default router;
