// controllers/companyServiceController.js
const CompanyServiceRequest = require("../models/CompanyServiceRequest");
const Company = require("../models/company");
const mongoose = require("mongoose");

// Request Campus Drives Service
exports.requestCampusDrives = async (req, res) => {
  try {
    const { companyId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Validate necessary fields for Campus Drives service
    const missingFields = [];
    if (!company.name) missingFields.push("Company Name");
    if (!company.contactPerson) missingFields.push("Contact Person");
    if (!company.email) missingFields.push("Email Address");
    if (!company.phone) missingFields.push("Phone Number");
    if (!company.industry) missingFields.push("Industry Type");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing fields",
        missingFields,
        instructions:
          "Please fill in the missing fields before requesting the Campus Drives service.",
      });
    }

    const companyServiceRequest = new CompanyServiceRequest({
      company: company._id,
      serviceType: "Campus Drives",
      details: {
        companyName: company.name,
        contactPerson: company.contactPerson,
        email: company.email,
        phone: company.phone,
        industry: company.industry,
      },
    });

    await companyServiceRequest.save();

    res.status(200).json({
      message: "Campus Drives service requested successfully.",
      companyServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Campus Drives request", error });
  }
};

// Request Part Of Job Fairs Service
exports.requestJobFairs = async (req, res) => {
  try {
    const { companyId, jobFairDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyServiceRequest = new CompanyServiceRequest({
      company: company._id,
      serviceType: "Part Of Job Fairs",
      details: jobFairDetails,
    });

    await companyServiceRequest.save();

    res.status(200).json({
      message: "Job Fairs service requested successfully.",
      companyServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Job Fairs request", error });
  }
};

// Request Staffing Solution Service
exports.requestStaffingSolution = async (req, res) => {
  try {
    const { companyId, staffingRequirements } = req.body;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyServiceRequest = new CompanyServiceRequest({
      company: company._id,
      serviceType: "Staffing Solution",
      details: staffingRequirements,
    });

    await companyServiceRequest.save();

    res.status(200).json({
      message: "Staffing Solution service requested successfully.",
      companyServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Staffing Solution request", error });
  }
};

// Request Staff Training Programs Service
exports.requestStaffTraining = async (req, res) => {
  try {
    const { companyId, trainingDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyServiceRequest = new CompanyServiceRequest({
      company: company._id,
      serviceType: "Staff Training Programs",
      details: trainingDetails,
    });

    await companyServiceRequest.save();

    res.status(200).json({
      message: "Staff Training Programs service requested successfully.",
      companyServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Staff Training request", error });
  }
};

// Request Internship Programs Service
exports.requestInternshipPrograms = async (req, res) => {
  try {
    const { companyId, internshipDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyServiceRequest = new CompanyServiceRequest({
      company: company._id,
      serviceType: "Internship Programs",
      details: internshipDetails,
    });

    await companyServiceRequest.save();

    res.status(200).json({
      message: "Internship Programs service requested successfully.",
      companyServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Internship Programs request", error });
  }
};

// Request Employer Branding Service
exports.requestEmployerBranding = async (req, res) => {
  try {
    const { companyId, brandingDetails } = req.body;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: "Invalid company ID format" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const companyServiceRequest = new CompanyServiceRequest({
      company: company._id,
      serviceType: "Employer Branding",
      details: brandingDetails,
    });

    await companyServiceRequest.save();

    res.status(200).json({
      message: "Employer Branding service requested successfully.",
      companyServiceRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error processing Employer Branding request", error });
  }
};
