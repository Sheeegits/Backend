// models/CompanyServiceRequest.js
import mongoose from "mongoose";

const companyServiceRequestSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    serviceType: {
      type: String,
      enum: [
        "Campus Drives",
        "Part Of Job Fairs",
        "Staffing Solution",
        "Staff Training Programs",
        "Internship Programs",
        "Employer Branding",
      ],
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed, // Dynamic fields depending on service type
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default mongoose.model(
  "CompanyServiceRequest",
  companyServiceRequestSchema
);
