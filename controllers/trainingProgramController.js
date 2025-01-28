// controllers/trainingProgramController.js
import ServiceRequest from "../models/ServiceRequest";
import College from "../models/College";
import mongoose from "mongoose";

export const requestTrainingProgram = async (req, res) => {
  try {
    const { collegeId, trainingDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Validate necessary fields for Training Program
    if (
      !trainingDetails.courseName ||
      !trainingDetails.duration ||
      !trainingDetails.expectedParticipants
    ) {
      return res
        .status(400)
        .json({ message: "Missing required training program details" });
    }

    // Create service request for Training Program
    const serviceRequest = new ServiceRequest({
      college: college._id,
      serviceType: "Training Program",
      details: trainingDetails,
    });

    await serviceRequest.save();

    res.status(200).json({
      message: "Training Program service requested successfully.",
      serviceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Training Program request", error });
  }
};
