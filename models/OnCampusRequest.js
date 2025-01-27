const mongoose = require("mongoose");

// Define the OnCampusRequest schema
const onCampusRequestSchema = new mongoose.Schema(
  {
    request_id: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    college_id: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true,  }, // Reference to the College model
    company_id: {type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, }, // Reference to the Company model
    details: { type: String, required: true },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the OnCampusRequest model
const OnCampusRequest = mongoose.model(
  "OnCampusRequest",
  onCampusRequestSchema
);

module.exports = OnCampusRequest;
