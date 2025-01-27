// models/CollegeServiceRequest.js
const mongoose = require("mongoose");

const collegeServiceRequestSchema = new mongoose.Schema(
  {
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
    details: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CollegeServiceRequest",
  collegeServiceRequestSchema
);
