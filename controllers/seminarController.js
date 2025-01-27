// controllers/seminarController.js
const ServiceRequest = require("../models/ServiceRequest");
const College = require("../models/College");
const mongoose = require("mongoose");

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

    // Validate necessary fields for Seminar
    if (
      !seminarDetails.topic ||
      !seminarDetails.date ||
      !seminarDetails.expectedParticipants
    ) {
      return res
        .status(400)
        .json({ message: "Missing required seminar details" });
    }

    // Create service request for Seminar
    const serviceRequest = new ServiceRequest({
      college: college._id,
      serviceType: "Seminar",
      details: seminarDetails,
    });

    await serviceRequest.save();

    res.status(200).json({
      message: "Seminar service requested successfully.",
      serviceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Seminar request", error });
  }
};
