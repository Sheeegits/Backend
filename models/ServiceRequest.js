// models/ServiceRequest.js
import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
  serviceType: {
    type: String,
    enum: [
      "Campus Placement",
      "Campus Branding",
      "Seminar",
      "Training Program",
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  details: {
    type: mongoose.Schema.Types.Mixed, // This will hold the specific details for each service
    required: true,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
