const Hackathon = require("../models/Hackathon");

// Create a new Hackathon
exports.createHackathon = async (req, res) => {
  try {
    const { hackathon_id, title, description, company_id } = req.body;

    const newHackathon = new Hackathon({
      hackathon_id,
      title,
      description,
      company_id,
    });

    await newHackathon.save();
    res
      .status(201)
      .json({ message: "Hackathon created successfully", newHackathon });
  } catch (error) {
    res.status(500).json({ message: "Error creating hackathon", error });
  }
};

// Get Hackathon by ID
exports.getHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id).populate(
      "company_id"
    );
    if (!hackathon)
      return res.status(404).json({ message: "Hackathon not found" });
    res.status(200).json(hackathon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hackathon", error });
  }
};

// Get all Hackathons
exports.getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().populate("company_id");
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hackathons", error });
  }
};

// Update Hackathon by ID
exports.updateHackathon = async (req, res) => {
  try {
    const { title, description, company_id } = req.body;
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      { title, description, company_id },
      { new: true }
    );
    if (!updatedHackathon)
      return res.status(404).json({ message: "Hackathon not found" });

    res.status(200).json(updatedHackathon);
  } catch (error) {
    res.status(500).json({ message: "Error updating hackathon", error });
  }
};

// Delete Hackathon by ID
exports.deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon)
      return res.status(404).json({ message: "Hackathon not found" });
    res.status(200).json({ message: "Hackathon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hackathon", error });
  }
};
