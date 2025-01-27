// controllers/collegeServiceController.js
const CollegeServiceRequest = require("../models/CollegeServiceRequest");
const College = require("../models/College");
const mongoose = require("mongoose");

// Request Campus Placement Service
exports.requestCampusPlacement = async (req, res) => {
  try {
    const { collegeId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Validate necessary fields for Campus Placement service
    const missingFields = [];
    if (
      !college.courses.polytechnicCourses.length &&
      !college.courses.ugCourses.length &&
      !college.courses.pgCourses.length
    ) {
      missingFields.push("Courses Offered");
    }
    if (
      !college.location.street ||
      !college.location.city ||
      !college.location.state ||
      !college.location.pincode
    ) {
      missingFields.push("Location Details");
    }
    if (
      !college.studentStrength.polytechnicStrength ||
      !college.studentStrength.ugStrength ||
      !college.studentStrength.pgStrength
    ) {
      missingFields.push("Student Strength");
    }
    if (!college.tpoEmail) {
      missingFields.push("TPO/SPOC Email");
    }
    if (!college.mobileNumber) {
      missingFields.push("Mobile Number");
    }
    if (
      !college.placementSeason.startDate ||
      !college.placementSeason.endDate
    ) {
      missingFields.push("Placement Season Duration");
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing fields",
        missingFields,
        instructions:
          "Please fill in the missing fields before requesting the Campus Placement service.",
      });
    }

    // Create service request for Campus Placement
    const collegeServiceRequest = new CollegeServiceRequest({
      college: college._id,
      serviceType: "Campus Placement",
      details: {
        coursesOffered: college.courses,
        location: college.location,
        studentStrength: college.studentStrength,
        tpoEmail: college.tpoEmail,
        mobileNumber: college.mobileNumber,
        placementSeason: college.placementSeason,
      },
    });

    await collegeServiceRequest.save();

    res.status(200).json({
      message: "Campus Placement service requested successfully.",
      collegeServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Campus Placement request", error });
  }
};

// Request Campus Branding Service
exports.requestCampusBranding = async (req, res) => {
  try {
    const { collegeId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const collegeServiceRequest = new CollegeServiceRequest({
      college: college._id,
      serviceType: "Campus Branding",
      details: {
        brandingInitiatives: req.body.brandingInitiatives,
      },
    });

    await collegeServiceRequest.save();

    res.status(200).json({
      message: "Campus Branding service requested successfully.",
      collegeServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Campus Branding request", error });
  }
};

// Request Seminar Service
exports.requestSeminar = async (req, res) => {
  try {
    const { collegeId, seminarDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const collegeServiceRequest = new CollegeServiceRequest({
      college: college._id,
      serviceType: "Seminar",
      details: seminarDetails,
    });

    await collegeServiceRequest.save();

    res.status(200).json({
      message: "Seminar service requested successfully.",
      collegeServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Seminar request", error });
  }
};

// Request Training Program Service
exports.requestTrainingProgram = async (req, res) => {
  try {
    const { collegeId, trainingProgramDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const collegeServiceRequest = new CollegeServiceRequest({
      college: college._id,
      serviceType: "Training Program",
      details: trainingProgramDetails,
    });

    await collegeServiceRequest.save();

    res.status(200).json({
      message: "Training Program service requested successfully.",
      collegeServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Training Program request", error });
  }
};
