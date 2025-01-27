const mongoose = require("mongoose");

// Define the Internship schema
const internshipSchema = new mongoose.Schema(
  {
    internship_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    company_id: { type: String, ref: "Company", required: true }, // Reference to the Company model
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the Internship model
const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
