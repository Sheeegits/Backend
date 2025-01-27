// controllers/campusPlacementController.js
const ServiceRequest = require("../models/ServiceRequest");
const College = require("../models/College");
const mongoose = require("mongoose");

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
    const serviceRequest = new ServiceRequest({
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

    await serviceRequest.save();

    res.status(200).json({
      message: "Campus Placement service requested successfully.",
      serviceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Campus Placement request", error });
  }
};
