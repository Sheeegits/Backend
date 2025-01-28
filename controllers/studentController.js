import Student from "../models/student.js";
import JobPosting from "../models/job.js";
import Internship from "../models/InternshipRequest.js";
import CreateJob from "../models/CreateJob.js";
import Hackathon from "../models/hackathon.js"; // Path to your Hackathon model
import mongoose from "mongoose";

// Get Student Profile
const getStudentProfileByUserId = async (req, res) => {
  try {
    const student = await Student.findOne({
      user_id: req.params.user_id,
    }).populate([
      { path: "appliedJobs", select: "title company deadline" },
      { path: "savedJobs", select: "title company location" },
    ]);

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching student profile" });
  }
};

// Update Student Profile
const updateStudentProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedData = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { user_id },
      updatedData,
      { new: true }
    );

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student profile" });
  }
};

// Apply for a Job
const applyForJobByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { jobId } = req.body;

    if (!jobId) return res.status(400).json({ message: "Job ID is required" });

    const student = await Student.findOne({ user_id });
    const jobExists = await CreateJob.exists({ _id: jobId });

    if (!student) return res.status(404).json({ message: "Student not found" });
    if (!jobExists) return res.status(404).json({ message: "Job not found" });

    if (!student.appliedJobs.includes(jobId)) {
      student.appliedJobs.push(jobId);
      await student.save();
    }

    res.status(200).json({ message: "Job application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying for job" });
  }
};

// Fetch appliedJob
const getAppliedJobsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the student and populate the appliedJobs field
    const student = await Student.findOne({ user_id }).populate({
      path: "appliedJobs",
      select: "title company_id deadline",
      populate: {
        path: "company_id", // Populate company details if required
        select: "name email",
      },
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student.appliedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applied jobs" });
  }
};

// Save a Job
const saveJobByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { jobId } = req.body;

    if (!jobId) return res.status(400).json({ message: "Job ID is required" });

    const student = await Student.findOne({ user_id });
    const jobExists = await JobPosting.exists({ _id: jobId });

    if (!student) return res.status(404).json({ message: "Student not found" });
    if (!jobExists) return res.status(404).json({ message: "Job not found" });

    if (!student.savedJobs.includes(jobId)) {
      student.savedJobs.push(jobId);
      await student.save();
    }

    res.status(200).json({ message: "Job saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving job" });
  }
};

//Fetched saved jobs
const getSavedJobsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const student = await Student.findOne({ user_id }).populate({
      path: "savedJobs",
      select: "title company location",
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student.savedJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching saved jobs" });
  }
};

//Apply for internships
const applyForInternshipByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { internshipId } = req.body;

    if (!internshipId)
      return res.status(400).json({ message: "Internship ID is required" });

    const student = await Student.findOne({ user_id });
    const internshipExists = await Internship.exists({ _id: internshipId });

    if (!student) return res.status(404).json({ message: "Student not found" });
    if (!internshipExists)
      return res.status(404).json({ message: "Internship not found" });

    if (!student.appliedInternships.includes(internshipId)) {
      student.appliedInternships.push(internshipId);
      await student.save();
    }

    res
      .status(200)
      .json({ message: "Internship application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying for internship" });
  }
};

//Fetch Applied Internship
const getAppliedInternshipsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the student and populate the appliedInternships
    const student = await Student.findOne({ user_id }).populate({
      path: "appliedInternships",
      select: "title description company_id", // Fields to include from InternshipRequest
      populate: {
        path: "company_id", // If you want details of the company
        select: "name email", // Fields to include from the Company model
      },
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    // Return the populated internships
    res.status(200).json(student.appliedInternships);
  } catch (error) {
    console.error("Error fetching applied internships:", error);
    res.status(500).json({ message: "Error fetching applied internships" });
  }
};

// Fetch the student's profile to get their skillset
const getJobsBySkillset = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch the student's profile
    const student = await Student.findOne({ user_id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Use the student's skillset to find matching jobs
    const jobs = await CreateJob.find({
      skillset: { $in: student.skills },
    });

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs by skillset", error });
  }
};

// Get Jobs Based on Preferences
const getJobsByPreferences = async (req, res) => {
  const { user_id } = req.params;
  const { location, experience, salary } = req.query;

  try {
    // Fetch the student's profile
    const student = await Student.findOne({ user_id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Build a dynamic query object
    const query = {
      skillset: { $in: student.skills }, // Filter by skillset
    };

    // Add additional filters based on preferences
    if (location) query.location = location;
    if (experience) query.experience = experience;
    if (salary) query.salary = { $gte: parseInt(salary) };

    // Find jobs matching the query
    const jobs = await CreateJob.find(query);

    res.status(200).json({ jobs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs by preferences", error });
  }
};

// Apply for Hackathon

const applyForHackathonByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { hackathonId } = req.body;

    if (!hackathonId) {
      return res.status(400).json({ message: "Hackathon ID is required" });
    }

    // Convert hackathonId to ObjectId using `new`
    const hackathonObjectId = new mongoose.Types.ObjectId(hackathonId);

    const student = await Student.findOne({ user_id });
    const hackathonExists = await Hackathon.exists({ _id: hackathonObjectId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!hackathonExists) {
      return res.status(404).json({ message: "Hackathon not found" });
    }

    // Ensure `appliedHackathons` is an array
    student.appliedHackathons = student.appliedHackathons || [];

    // Check if the student has already applied for the hackathon
    if (student.appliedHackathons.includes(hackathonObjectId.toString())) {
      return res.status(400).json({
        message: "You have already applied for this hackathon.",
      });
    }

    // Add the hackathon to the student's appliedHackathons
    student.appliedHackathons.push(hackathonObjectId);
    await student.save();

    // Add the student's ID to the hackathon's applied_hackathon list
    const hackathon = await Hackathon.findById(hackathonObjectId);
    hackathon.applied_hackathon = hackathon.applied_hackathon || [];

    if (!hackathon.applied_hackathon.includes(student._id.toString())) {
      hackathon.applied_hackathon.push(student._id);
      await hackathon.save();
    }

    res
      .status(200)
      .json({ message: "Hackathon application submitted successfully" });
  } catch (error) {
    console.error("Error applying for hackathon:", error);
    res.status(500).json({ message: "Error applying for hackathon" });
  }
};

// Fetch Applied Hackathons for a Student
const getAppliedHackathonsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the student and populate the appliedHackathons
    const student = await Student.findOne({ user_id }).populate({
      path: "appliedHackathons",
      select: "hackathon_id title description company_id", // Fields to include from Hackathon
      match: { hackathon_id: { $exists: true } }, // Match by hackathon_id
      populate: {
        path: "company_id", // Populate company details if necessary
        select: "name email", // Fields to include from the Company model
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student.appliedHackathons);
  } catch (error) {
    console.error("Error fetching applied hackathons:", error);
    res.status(500).json({ message: "Error fetching applied hackathons" });
  }
};

export default {
  getStudentProfileByUserId,
  updateStudentProfileByUserId,
  applyForJobByUserId,
  getAppliedJobsByUserId,
  saveJobByUserId,
  getSavedJobsByUserId,
  applyForInternshipByUserId,
  getAppliedInternshipsByUserId,
  getJobsBySkillset,
  getJobsByPreferences,
  applyForHackathonByUserId,
  getAppliedHackathonsByUserId,
};
