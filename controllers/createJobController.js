import CreateJob from "../models/CreateJob.js";

// Create a new Job
export const createJob = async (req, res) => {
  try {
    const {
      job_id,
      title,
      description,
      skillset,
      location,
      experience,
      salary,
      company_id,
    } = req.body;

    const newJob = new CreateJob({
      job_id,
      title,
      description,
      skillset,
      location,
      experience,
      salary,
      company_id,
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
    const job = await CreateJob.findById(req.params.id).populate("company_id");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

// Get all Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await CreateJob.find().populate("company_id");
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
      skillset,
      location,
      experience,
      salary,
      company_id,
    } = req.body;

    const updatedJob = await CreateJob.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        skillset,
        location,
        experience,
        salary,
        company_id,
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
    const job = await CreateJob.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};
