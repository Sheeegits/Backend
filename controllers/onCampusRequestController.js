const OnCampusRequest = require("../models/OnCampusRequest");

// Create a new OnCampusRequest
exports.createOnCampusRequest = async (req, res) => {
  try {
    const { request_id, course, college_id, company_id, details } = req.body;

    const newRequest = new OnCampusRequest({
      request_id,
      course,
      college_id,
      company_id,
      details,
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: "On-campus request created successfully", newRequest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating on-campus request", error });
  }
};

// Get OnCampusRequest by ID
exports.getOnCampusRequest = async (req, res) => {
  try {
    const request = await OnCampusRequest.findById(req.params.id)
      .populate("college_id")
      .populate("company_id");
    if (!request)
      return res.status(404).json({ message: "On-campus request not found" });
    res.status(200).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching on-campus request", error });
  }
};

// Get all OnCampusRequests
exports.getAllOnCampusRequests = async (req, res) => {
  try {
    const requests = await OnCampusRequest.find()
      .populate("college_id")
      .populate("company_id");
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching on-campus requests", error });
  }
};

// Update OnCampusRequest by ID
exports.updateOnCampusRequest = async (req, res) => {
  try {
    const { course, college_id, company_id, details } = req.body;

    const updatedRequest = await OnCampusRequest.findByIdAndUpdate(
      req.params.id,
      { course, college_id, company_id, details },
      { new: true }
    );
    if (!updatedRequest)
      return res.status(404).json({ message: "On-campus request not found" });

    res.status(200).json(updatedRequest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating on-campus request", error });
  }
};

// Delete OnCampusRequest by ID
exports.deleteOnCampusRequest = async (req, res) => {
  try {
    const request = await OnCampusRequest.findByIdAndDelete(req.params.id);
    if (!request)
      return res.status(404).json({ message: "On-campus request not found" });
    res.status(200).json({ message: "On-campus request deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting on-campus request", error });
  }
};
