import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library

// Define the InternshipRequest schema
const internshipRequestSchema = new mongoose.Schema(
  {
    internship_id: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    }, // Reference to the Company model
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the InternshipRequest model
const InternshipRequest = mongoose.model(
  "InternshipRequest",
  internshipRequestSchema
);

export default InternshipRequest;
