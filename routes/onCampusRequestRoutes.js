const express = require("express");
const router = express.Router();
const {
  createOnCampusRequest,
  getOnCampusRequest,
  getAllOnCampusRequests,
  updateOnCampusRequest,
  deleteOnCampusRequest,
} = require("../controllers/onCampusRequestController");

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

module.exports = router;
