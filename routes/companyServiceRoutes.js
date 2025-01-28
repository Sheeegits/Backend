// routes/companyServiceRoutes.js
import express from "express";
const router = express.Router();
import companyServiceController from "../controllers/companyServiceController.js";

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

export default router;
