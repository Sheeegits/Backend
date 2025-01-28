import Internship from "../models/internship.js";

// Create a new Internship
export const createInternship = async (req, res) => {
  try {
    const { internship_id, title, description, company_id } = req.body;

    const newInternship = new Internship({
      internship_id,
      title,
      description,
      company_id,
    });

    await newInternship.save();
    res
      .status(201)
      .json({ message: "Internship created successfully", newInternship });
  } catch (error) {
    res.status(500).json({ message: "Error creating internship", error });
  }
};

// Get Internship by ID
export const getInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate(
      "company_id"
    );
    if (!internship)
      return res.status(404).json({ message: "Internship not found" });
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({ message: "Error fetching internship", error });
  }
};

// Get all Internships
export const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate("company_id");
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching internships", error });
  }
};

// Update Internship by ID
export const updateInternship = async (req, res) => {
  try {
    const { title, description, company_id } = req.body;
    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      { title, description, company_id },
      { new: true }
    );
    if (!updatedInternship)
      return res.status(404).json({ message: "Internship not found" });

    res.status(200).json(updatedInternship);
  } catch (error) {
    res.status(500).json({ message: "Error updating internship", error });
  }
};

// Delete Internship by ID
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship)
      return res.status(404).json({ message: "Internship not found" });
    res.status(200).json({ message: "Internship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting internship", error });
  }
};
