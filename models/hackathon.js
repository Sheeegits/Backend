const mongoose = require("mongoose");

// Define the Hackathon schema
const hackathonSchema = new mongoose.Schema(
  {
    hackathon_id: { type: String, required: true, unique: true }, // Custom string identifier
    title: { type: String, required: true },
    description: { type: String, required: true },
    company_id: { type: String, ref: "Company", required: true }, // Reference to the Company model
    applied_hackathon: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    ], // Added applied_hackathon as an array of user_ids
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Check if the model already exists and use the existing one or define a new model
const Hackathon = mongoose.models.Hackathon || mongoose.model("Hackathon", hackathonSchema);

module.exports = Hackathon;
