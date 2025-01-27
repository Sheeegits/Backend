// controllers/campusBrandingController.js
const ServiceRequest = require("../models/ServiceRequest");
const College = require("../models/College");
const mongoose = require("mongoose");

exports.requestCampusBranding = async (req, res) => {
  try {
    const { collegeId, brandingDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Validate necessary fields for Campus Branding
    if (
      !brandingDetails.targetAudience ||
      !brandingDetails.strategy ||
      !brandingDetails.expectedResults
    ) {
      return res
        .status(400)
        .json({ message: "Missing required branding details" });
    }

    // Create service request for Campus Branding
    const serviceRequest = new ServiceRequest({
      college: college._id,
      serviceType: "Campus Branding",
      details: brandingDetails,
    });

    await serviceRequest.save();

    res.status(200).json({
      message: "Campus Branding service requested successfully.",
      serviceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Campus Branding request", error });
  }
};
