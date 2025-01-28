import mongoose from "mongoose";

// Define the OffCampusRequest schema
const offCampusRequestSchema = new mongoose.Schema(
  {
    request_id: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    }, // Reference to the Company model
    details: { type: String, required: true },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the OffCampusRequest model
const OffCampusRequest = mongoose.model(
  "OffCampusRequest",
  offCampusRequestSchema
);

export default OffCampusRequest;
