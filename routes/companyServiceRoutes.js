// routes/companyServiceRoutes.js
const express = require("express");
const router = express.Router();
const companyServiceController = require("../controllers/companyServiceController");

// Routes for company services
router.post("/campus-drives", companyServiceController.requestCampusDrives);
router.post("/job-fairs", companyServiceController.requestJobFairs);
router.post(
  "/staffing-solution",
  companyServiceController.requestStaffingSolution
);
router.post("/staff-training", companyServiceController.requestStaffTraining);
router.post(
  "/internship-programs",
  companyServiceController.requestInternshipPrograms
);
router.post(
  "/employer-branding",
  companyServiceController.requestEmployerBranding
);

module.exports = router;
