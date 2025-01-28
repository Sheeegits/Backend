// routes/collegeServiceRoutes.js
import express from "express";
const router = express.Router();
import {
  requestCampusPlacement,
  requestCampusBranding,
  requestSeminar,
  requestTrainingProgram,
} from "../controllers/collegeServiceController.js";

// Request Campus Placement Service
router.post("/campus-placement", requestCampusPlacement);

// Request Campus Branding Service
router.post("/campus-branding", requestCampusBranding);

// Request Seminar Service
router.post("/seminar", requestSeminar);

// Request Training Program Service
router.post("/training-program", requestTrainingProgram);

export default router;
