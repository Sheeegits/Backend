const College = require("../models/College");
//const JobPosting = require("../models/job");
const InternshipRequest = require("../models/InternshipRequest");
const OnCampusRequest = require("../models/OnCampusRequest");
const OffCampusRequest = require("../models/OffCampusRequest");
const Hackathon = require("../models/Hackathon");
const mongoose = require("mongoose");

// Get College Profile
exports.getCollegeProfile = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) return res.status(404).json({ message: "College not found" });

    res.status(200).json(college);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching college profile" });
  }
};

// Update College Profile
exports.updateCollegeProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCollege = await College.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedCollege)
      return res.status(404).json({ message: "College not found" });

    res.status(200).json(updatedCollege);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating college profile" });
  }
};


// Apply to OnCampus Request
exports.applyToOnCampusRequest = async (req, res) => {
  try {
    const { id } = req.params; // College ID
    const { jobId } = req.body; // OnCampusRequest ID

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Find College and Job
    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const jobExists = await OnCampusRequest.exists({ _id: jobId });
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure on_campus_requests is initialized
    if (!Array.isArray(college.on_campus_requests)) {
      college.on_campus_requests = [];
    }

    // Check if already applied
    if (college.on_campus_requests.includes(jobId)) {
      return res
        .status(400)
        .json({ message: "Already applied for this OnCampus job" });
    }

    // Apply for the OnCampus Request
    college.on_campus_requests.push(jobId);

    // Save the updated college document
    await college.save();

    res.status(200).json({ message: "Applied for OnCampus job successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying to OnCampus job", error });
  }
};


// Fetch applied OnCampus Jobs for a College
exports.getAppliedOnCampusJobs = async (req, res) => {
  try {
    const { id } = req.params; // College ID

    // Validate College ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    // Find the College
    const college = await College.findById(id).populate('on_campus_requests');
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Check if there are applied OnCampus jobs
    if (!college.on_campus_requests || college.on_campus_requests.length === 0) {
      return res.status(404).json({ message: "No applied OnCampus jobs found" });
    }

    // Return the applied OnCampus jobs
    res.status(200).json({
      message: "Applied OnCampus jobs fetched successfully",
      appliedJobs: college.on_campus_requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applied OnCampus jobs", error });
  }
};


// Apply to OffCampus Request
exports.applyToOffCampusRequest = async (req, res) => {
  try {
    const { id } = req.params; // College ID
    const { jobId } = req.body; // OffCampusRequest ID

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Find College and Job
    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const jobExists = await OffCampusRequest.exists({ _id: jobId });
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    if (college.off_campus_requests.includes(jobId)) {
      return res.status(400).json({ message: "Already applied for this OffCampus job" });
    }

    // Apply for the OffCampus Request
    college.off_campus_requests.push(jobId);

    // Save the updated college document
    await college.save();

    res.status(200).json({ message: "Applied for OffCampus job successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying to OffCampus job", error });
  }
};

// Fetch applied OffCampus Jobs for a College
exports.getAppliedOffCampusJobs = async (req, res) => {
  try {
    const { id } = req.params; // College ID

    // Validate College ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid college ID format" });
    }

    // Find the College and populate the OffCampus requests
    const college = await College.findById(id).populate('off_campus_requests');
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Check if there are applied OffCampus jobs
    if (
      !college.off_campus_requests ||
      college.off_campus_requests.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "No applied OffCampus jobs found" });
    }

    // Return the applied OffCampus jobs
    res.status(200).json({
      message: "Applied OffCampus jobs fetched successfully",
      appliedJobs: college.off_campus_requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applied OffCampus jobs", error });
  }
};



// Apply to Internship Request
exports.applyToInternshipRequest = async (req, res) => {
  try {
    const { id } = req.params; // College ID
    const { internshipId } = req.body; // Internship ID

    // Check if internshipId is provided
    if (!internshipId) {
      return res.status(400).json({ message: "Internship ID is required" });
    }

    // Fetch the college and check if it exists
    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Check if the internship exists
    const internshipExists = await InternshipRequest.exists({ _id: internshipId });
    if (!internshipExists) {
      return res.status(404).json({ message: "Internship not found" });
    }

    // Ensure `internship_requests` is initialized as an array
    if (!Array.isArray(college.internship_requests)) {
      college.internship_requests = [];
    }

    // Check if the internship is already applied for
    if (college.internship_requests.includes(internshipId)) {
      return res
        .status(400)
        .json({ message: "You have already applied for this internship" });
    }

    // Add the internship ID to the list and save the college
    college.internship_requests.push(internshipId);
    await college.save();

    res.status(200).json({ message: "Applied for Internship successfully" });
  } catch (error) {
    console.error("Error applying to internship:", error);
    res.status(500).json({ message: "Error applying to internship" });
  }
};


// Fetch Applied Internships
exports.getAppliedInternships = async (req, res) => {
  try {
    const { id } = req.params; // College ID

    // Find the college by ID and populate the applied internships
    const college = await College.findById(id).populate({
      path: "internship_requests", // Field to populate
      model: "InternshipRequest", // Referenced model
      select: "title description company_id startDate endDate", // Fields to include in the response
    });

    // Check if the college exists
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Respond with the list of applied internships
    res.status(200).json({
      message: "Applied internships retrieved successfully",
      internships: college.internship_requests,
    });
  } catch (error) {
    console.error("Error fetching applied internships:", error);
    res.status(500).json({ message: "Error fetching applied internships" });
  }
};


// Apply to Hackathon
exports.applyToHackathon = async (req, res) => {
  try {
    const { id } = req.params; // College ID
    const { hackathonId } = req.body; // Hackathon ID

    if (!hackathonId) {
      return res.status(400).json({ message: "Hackathon ID is required" });
    }

    // Convert hackathonId to ObjectId using mongoose
    const hackathonObjectId = new mongoose.Types.ObjectId(hackathonId);

    // Fetch the College and Hackathon documents
    const college = await College.findById(id);
    const hackathonExists = await Hackathon.exists({ _id: hackathonObjectId });

    // Check if the College and Hackathon exist
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    if (!hackathonExists) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    // Ensure appliedHackathons is initialized as an array if it's not already
    if (!Array.isArray(college.hackathon_applications)) {
      college.hackathon_applications = [];
    }

    // Check if the college has already applied to this hackathon
    if (college.hackathon_applications.includes(hackathonObjectId.toString())) {
      return res
        .status(400)
        .json({ message: "Already applied to this hackathon" });
    }

    // Push the hackathon ID into the applied hackathons field
    college.hackathon_applications.push(hackathonObjectId);

    // Save the updated College document
    await college.save();

    res.status(200).json({ message: "Applied for Hackathon successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying to hackathon" });
  }
};

exports.getAppliedHackathons = async (req, res) => {
  try {
    const { id } = req.params; // College ID

    // Fetch the college by ID and populate the hackathon_applications field
    const college = await College.findById(id).populate(
      "hackathon_applications"
    );

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // Return the list of hackathons the college has applied to
    res.status(200).json({
      message: "Applied hackathons fetched successfully",
      appliedHackathons: college.hackathon_applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applied hackathons" });
  }
};



// Global error handler
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
};
