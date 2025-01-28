import express from "express";
const router = express.Router();
import studentController from "../controllers/studentController.js";

// Student Profile Routes
router.get("/profile/:user_id", studentController.getStudentProfileByUserId);
router.put("/profile/:user_id", studentController.updateStudentProfileByUserId);

// Job Application Routes
router.post("/apply-job/:user_id", studentController.applyForJobByUserId);
router.get("/applied-jobs/:user_id", studentController.getAppliedJobsByUserId);
router.post("/save-job/:user_id", studentController.saveJobByUserId);
router.get("/saved-jobs/:user_id", studentController.getSavedJobsByUserId);

// Job Search Routes
router.get("/jobs/skillset/:user_id", studentController.getJobsBySkillset);
router.get(
  "/jobs/preferences/:user_id",
  studentController.getJobsByPreferences
);

// Internship Application Routes
router.post(
  "/apply-internship/:user_id",
  studentController.applyForInternshipByUserId
);
router.get(
  "/applied-internships/:user_id",
  studentController.getAppliedInternshipsByUserId
);

// Route for applying for a hackathon
router.post(
  "/apply_for_hackathon/:user_id",
  studentController.applyForHackathonByUserId
);
router.get(
  "/applied_hackathons/:user_id",
  studentController.getAppliedHackathonsByUserId
);

// Export the router
export default router;
