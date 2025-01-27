const express = require("express");
const router = express.Router();
const {
  getCompanyProfile,
  updateCompanyProfile,
  createJobPosting,
  getJobPostingsByCompanyId,
  applyToHackathon,
  applyToOffCampusRequest,
  applyToOnCampusRequest,
  getAppliedHackathons,
  getAppliedOffCampusJobs,
  getAppliedOnCampusJobs,
} = require("../controllers/companyController");

// Get company profile
router.get("/:id", getCompanyProfile);

// Update company profile
router.put("/:id", updateCompanyProfile);

// Create a Job Posting
router.post("/job-postings/:id", createJobPosting);

// Get Job Postings by Company ID`
router.get("/job-postings/:id", getJobPostingsByCompanyId);

// Apply to Hackathon
router.post("/apply/hackathon/:id", applyToHackathon);

// Apply to Off-campus Request
router.post("/apply/off-campus/:id", applyToOffCampusRequest);


// Apply to On-campus Request
router.post("/apply/on-campus/:id", applyToOnCampusRequest);

// Get Applied Hackathons
router.get("/applied/hackathons/:id", getAppliedHackathons);

// Get Applied Off-campus Jobs
router.get("/applied/off-campus/:id", getAppliedOffCampusJobs);

// Get Applied On-campus Jobs
router.get("/applied/on-campus/:id", getAppliedOnCampusJobs);
module.exports = router;
