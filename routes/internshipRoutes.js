import express from "express";
const router = express.Router();
import {
  createInternship,
  getInternship,
  getAllInternships,
  updateInternship,
  deleteInternship,
} from "../controllers/internshipController.js";

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

export default router;
