// routes/collegeServiceRoutes.js
const express = require("express");
const router = express.Router();
const {
  requestCampusPlacement,
  requestCampusBranding,
  requestSeminar,
  requestTrainingProgram,
} = require("../controllers/collegeServiceController");

// Request Campus Placement Service
router.post("/campus-placement", requestCampusPlacement);

// Request Campus Branding Service
router.post("/campus-branding", requestCampusBranding);

// Request Seminar Service
router.post("/seminar", requestSeminar);

// Request Training Program Service
router.post("/training-program", requestTrainingProgram);

module.exports = router;
