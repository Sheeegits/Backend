const Company = require("../models/company");
const JobPosting = require("../models/CreateJob");
//const EventRequest = require("../models/EventRequest");
//const InternshipOffer = require("../models/InternshipOffer");
const Hackathon = require("../models/Hackathon");
const OffCampusRequest = require("../models/OffCampusRequest");
const OnCampusRequest = require("../models/OnCampusRequest");
const College = require("../models/College");
const mongoose = require("mongoose");


// Get College Profile
exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching company profile" });
  }
};

// Update Company Profile
exports.updateCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedCompany)
      return res.status(404).json({ message: "Company not found" });

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Error updating company profile", error });
  }
};

// Create a Job Posting
exports.createJobPosting = async (req, res) => {
  try {
    const {
      title,
      description,
      salary,
      experience,
      location,
      skillset,
      job_id,
    } = req.body;

    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const newJobPosting = await JobPosting.create({
      company_id: company._id,
      title,
      description,
      salary,
      experience,
      location,
      skillset,
      job_id,
    });

    company.job_postings.push(newJobPosting._id);
    await company.save();

    res.status(201).json({
      message: "Job posting created successfully",
      newJobPosting,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating job posting",
      error,
    });
  }
};

// Get Job Postings by Company ID
exports.getJobPostingsByCompanyId = async (req, res) => {
  try {
    const companyId = req.params.id; // Get the company ID from the request parameters
    

    // Validate the companyId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    // Fetch the job postings for the given company ID
    const company = await Company.findById(companyId).populate("job_postings");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Job postings fetched successfully",
      jobPostings: company.job_postings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching job postings by company", error });
  }
};





// Apply to OnCampus Request
exports.applyToOnCampusRequest = async (req, res) => {
  try {
    const { id } = req.params; // Company ID
    const { jobId } = req.body; // OnCampusRequest ID

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Find the Company and Job
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const jobExists = await OnCampusRequest.exists({ _id: jobId });
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Ensure on_campus_requests is initialized
    if (!Array.isArray(company.on_campus_requests)) {
      company.on_campus_requests = [];
    }

    // Check if already applied
    if (company.on_campus_requests.includes(jobId)) {
      return res.status(400).json({ message: "Already applied for this OnCampus job" });
    }

    // Apply for the OnCampus Request
    company.on_campus_requests.push(jobId);

    // Save the updated company document
    await company.save();

    res.status(200).json({ message: "Applied for OnCampus job successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying to OnCampus job", error });
  }
};


// Fetch applied OnCampus Jobs for a Company
exports.getAppliedOnCampusJobs = async (req, res) => {
  try {
    const { id } = req.params; // Company ID

    // Validate Company ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    // Find the Company and populate the OnCampus requests
    const company = await Company.findById(id).populate('on_campus_requests');
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Check if there are applied OnCampus jobs
    if (!company.on_campus_requests || company.on_campus_requests.length === 0) {
      return res.status(404).json({ message: "No applied OnCampus jobs found" });
    }

    // Return the applied OnCampus jobs
    res.status(200).json({
      message: "Applied OnCampus jobs fetched successfully",
      appliedJobs: company.on_campus_requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applied OnCampus jobs", error });
  }
};



// Apply to OffCampus Request
exports.applyToOffCampusRequest = async (req, res) => {
  try {
    const { id } = req.params; // Company ID
    const { jobId } = req.body; // OffCampusRequest ID

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Find the Company and Job
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const jobExists = await OffCampusRequest.exists({ _id: jobId });
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    if (company.off_campus_requests.includes(jobId)) {
      return res.status(400).json({ message: "Already applied for this OffCampus job" });
    }

    // Apply for the OffCampus Request
    company.off_campus_requests.push(jobId);

    // Save the updated company document
    await company.save();

    res.status(200).json({ message: "Applied for OffCampus job successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying to OffCampus job", error });
  }
};

// Fetch applied OffCampus Jobs for a Company
exports.getAppliedOffCampusJobs = async (req, res) => {
  try {
    const { id } = req.params; // Company ID

    // Validate Company ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    // Find the Company and populate the OffCampus requests
    const company = await Company.findById(id).populate('off_campus_requests');
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Check if there are applied OffCampus jobs
    if (
      !company.off_campus_requests ||
      company.off_campus_requests.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "No applied OffCampus jobs found" });
    }

    // Return the applied OffCampus jobs
    res.status(200).json({
      message: "Applied OffCampus jobs fetched successfully",
      appliedJobs: company.off_campus_requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applied OffCampus jobs", error });
  }
};


// Apply to Hackathon
exports.applyToHackathon = async (req, res) => {
  try {
    const { id } = req.params; // Company ID
    const { hackathonId } = req.body; // Hackathon ID

    if (!hackathonId) {
      return res.status(400).json({ message: "Hackathon ID is required" });
    }

    // Convert hackathonId to ObjectId using mongoose
    const hackathonObjectId = new mongoose.Types.ObjectId(hackathonId);

    // Fetch the Company and Hackathon documents
    const company = await Company.findById(id);
    const hackathonExists = await Hackathon.exists({ _id: hackathonObjectId });

    // Check if the Company and Hackathon exist
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    if (!hackathonExists) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    // Ensure hackathon_applications is initialized as an array if it's not already
    if (!Array.isArray(company.hackathon_applications)) {
      company.hackathon_applications = [];
    }

    // Check if the company has already applied to this hackathon
    if (company.hackathon_applications.includes(hackathonObjectId.toString())) {
      return res.status(400).json({ message: "Already applied to this hackathon" });
    }

    // Push the hackathon ID into the applied hackathons field
    company.hackathon_applications.push(hackathonObjectId);

    // Save the updated Company document
    await company.save();

    res.status(200).json({ message: "Applied for Hackathon successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying to hackathon" });
  }
};


// Get Applied Hackathons
exports.getAppliedHackathons = async (req, res) => {
  try {
    const { id } = req.params; // Company ID

    // Fetch the Company document
    const company = await Company.findById(id).populate('hackathon_applications');

    // Check if the Company exists
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // If the company has applied to any hackathons, return the list of hackathons
    if (company.hackathon_applications.length > 0) {
      res.status(200).json({
        message: "Fetched applied hackathons successfully",
        appliedHackathons: company.hackathon_applications
      });
    } else {
      res.status(404).json({ message: "No applied hackathons found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applied hackathons" });
  }
};
