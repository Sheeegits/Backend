// controllers/campusPlacementController.js
import ServiceRequest from "../models/ServiceRequest";
import College from "../models/college.js";
import mongoose from "mongoose";

export const requestCampusPlacement = async (req, res) => {
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
    const {
      courses,
      location,
      studentStrength,
      tpoEmail,
      mobileNumber,
      placementSeason,
    } = college;

    if (
      !courses.polytechnicCourses.length &&
      !courses.ugCourses.length &&
      !courses.pgCourses.length
    ) {
      missingFields.push("Courses Offered");
    }
    if (
      !location.street ||
      !location.city ||
      !location.state ||
      !location.pincode
    ) {
      missingFields.push("Location Details");
    }
    if (
      !studentStrength.polytechnicStrength ||
      !studentStrength.ugStrength ||
      !studentStrength.pgStrength
    ) {
      missingFields.push("Student Strength");
    }
    if (!tpoEmail) {
      missingFields.push("TPO/SPOC Email");
    }
    if (!mobileNumber) {
      missingFields.push("Mobile Number");
    }
    if (!placementSeason.startDate || !placementSeason.endDate) {
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
        coursesOffered: courses,
        location,
        studentStrength,
        tpoEmail,
        mobileNumber,
        placementSeason,
      },
    });

    await serviceRequest.save();

    return res.status(200).json({
      message: "Campus Placement service requested successfully.",
      serviceRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error processing Campus Placement request",
      error,
    });
  }
};
