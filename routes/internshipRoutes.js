const express = require("express");
const router = express.Router();
const {
  createInternship,
  getInternship,
  getAllInternships,
  updateInternship,
  deleteInternship,
} = require("../controllers/internshipController");

// Create a new Internship
router.post("/", createInternship);

// Get an Internship by ID
router.get("/:id", getInternship);

// Get all Internships
router.get("/", getAllInternships);

// Update Internship by ID
router.put("/:id", updateInternship);

// Delete Internship by ID
router.delete("/:id", deleteInternship);

module.exports = router;
