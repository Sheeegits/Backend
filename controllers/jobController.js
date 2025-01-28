import Job from "../models/job.js";

// Create a new Job
export const createJob = async (req, res) => {
  try {
    const {
      jobId,
      companyId,
      title,
      description,
      skillsRequired,
      location,
      jobType,
      salary,
      applicationDeadline,
    } = req.body;

    const newJob = new Job({
      jobId,
      companyId,
      title,
      description,
      skillsRequired,
      location,
      jobType,
      salary,
      applicationDeadline,
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", newJob });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

// Get Job by ID
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("companyId");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

// Get all Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("companyId");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Update Job by ID
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      skillsRequired,
      location,
      jobType,
      salary,
      applicationDeadline,
    } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        skillsRequired,
        location,
        jobType,
        salary,
        applicationDeadline,
      },
      { new: true }
    );
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

// Delete Job by ID
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};
