import InternshipRequest from "../models/InternshipRequest.js";

// Create a new Internship Request
export const createInternshipRequest = async (req, res) => {
  try {
    const { internship_id, title, description, course, company_id } = req.body;

    const newInternshipRequest = new InternshipRequest({
      internship_id,
      title,
      description,
      course,
      company_id,
    });

    await newInternshipRequest.save();
    res.status(201).json({
      message: "Internship request created successfully",
      newInternshipRequest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating internship request", error });
  }
};

// Get Internship Request by ID
export const getInternshipRequest = async (req, res) => {
  try {
    const internshipRequest = await InternshipRequest.findById(
      req.params.id
    ).populate("company_id");
    if (!internshipRequest)
      return res.status(404).json({ message: "Internship request not found" });
    res.status(200).json(internshipRequest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching internship request", error });
  }
};

// Get all Internship Requests
export const getAllInternshipRequests = async (req, res) => {
  try {
    const internshipRequests = await InternshipRequest.find().populate(
      "company_id"
    );
    res.status(200).json(internshipRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching internship requests", error });
  }
};

// Update Internship Request by ID
export const updateInternshipRequest = async (req, res) => {
  try {
    const { title, description, course, company_id } = req.body;
    const updatedInternshipRequest = await InternshipRequest.findByIdAndUpdate(
      req.params.id,
      { title, description, course, company_id },
      { new: true }
    );
    if (!updatedInternshipRequest)
      return res.status(404).json({ message: "Internship request not found" });

    res.status(200).json(updatedInternshipRequest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating internship request", error });
  }
};

// Delete Internship Request by ID
export const deleteInternshipRequest = async (req, res) => {
  try {
    const internshipRequest = await InternshipRequest.findByIdAndDelete(
      req.params.id
    );
    if (!internshipRequest)
      return res.status(404).json({ message: "Internship request not found" });
    res
      .status(200)
      .json({ message: "Internship request deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting internship request", error });
  }
};
