const express = require("express");
const router = express.Router();

// Import controller functions from the collegeController
const {
  getCollegeProfile,
  updateCollegeProfile,
  applyToOnCampusRequest,
  applyToOffCampusRequest,
  applyToInternshipRequest,
  applyToHackathon,
  errorHandler,
  getAppliedHackathons,
  getAppliedInternships,
  getAppliedOnCampusJobs,
  getAppliedOffCampusJobs
} = require("../controllers/collegeController");

// Define routes for applying to requests

router.get('/:id', getCollegeProfile);
router.put('/:id', updateCollegeProfile);
router.post("/apply/oncampus/:id", applyToOnCampusRequest);
router.post("/apply/offcampus/:id", applyToOffCampusRequest);
router.post("/apply/internship/:id", applyToInternshipRequest);
router.post("/apply/hackathon/:id", applyToHackathon);
router.get("/applied/hackathons/:id", getAppliedHackathons);
router.get("/applied/internships/:id", getAppliedInternships);
router.get("/applied/oncampus/:id", getAppliedOnCampusJobs);
router.get("/applied/offcampus/:id", getAppliedOffCampusJobs);

// Global error handling middleware
router.use(errorHandler);

module.exports = router;
