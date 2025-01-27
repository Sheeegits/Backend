const mongoose = require("mongoose");

// Define the Job schema
const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true },
    companyId: { type: String, ref: "Company", required: true }, // Reference to the Company model
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: [{ type: String }], // Array of strings for skills
    location: { type: String },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship"], // Predefined values for job types
      required: true,
    },
    salary: { type: Number },
    postedDate: { type: Date, default: Date.now }, // Default to the current date
    applicationDeadline: { type: Date },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt fields
);

// Export the Job model
const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
