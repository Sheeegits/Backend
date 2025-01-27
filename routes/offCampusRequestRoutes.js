const express = require("express");
const router = express.Router();
const {
  createOffCampusRequest,
  getOffCampusRequest,
  getAllOffCampusRequests,
  updateOffCampusRequest,
  deleteOffCampusRequest,
} = require("../controllers/offCampusRequestController");

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

module.exports = router;
