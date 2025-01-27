const express = require("express");
const router = express.Router();
const {
  createInternshipRequest,
  getInternshipRequest,
  getAllInternshipRequests,
  updateInternshipRequest,
  deleteInternshipRequest,
} = require("../controllers/internshipRequestController");

// Create a new Internship Request
router.post("/", createInternshipRequest);

// Get an Internship Request by ID
router.get("/:id", getInternshipRequest);

// Get all Internship Requests
router.get("/", getAllInternshipRequests);

// Update Internship Request by ID
router.put("/:id", updateInternshipRequest);

// Delete Internship Request by ID
router.delete("/:id", deleteInternshipRequest);

module.exports = router;
