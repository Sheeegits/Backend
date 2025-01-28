// controllers/campusBrandingController.js
import ServiceRequest from "../models/ServiceRequest";
import College from "../models/college";
import mongoose from "mongoose";

export const requestCampusBranding = async (req, res) => {
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
    const { targetAudience, strategy, expectedResults } = brandingDetails || {};
    if (!targetAudience || !strategy || !expectedResults) {
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

    return res.status(200).json({
      message: "Campus Branding service requested successfully.",
      serviceRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error processing Campus Branding request",
      error,
    });
  }
};
