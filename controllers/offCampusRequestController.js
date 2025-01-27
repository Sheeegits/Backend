const OffCampusRequest = require("../models/OffCampusRequest");

// Create a new OffCampusRequest
exports.createOffCampusRequest = async (req, res) => {
  try {
    const { request_id, course, company_id, details } = req.body;

    const newRequest = new OffCampusRequest({
      request_id,
      course,
      company_id,
      details,
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: "Off-campus request created successfully", newRequest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating off-campus request", error });
  }
};

// Get OffCampusRequest by ID
exports.getOffCampusRequest = async (req, res) => {
  try {
    const request = await OffCampusRequest.findById(req.params.id).populate(
      "company_id"
    );
    if (!request)
      return res.status(404).json({ message: "Off-campus request not found" });
    res.status(200).json(request);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching off-campus request", error });
  }
};

// Get all OffCampusRequests
exports.getAllOffCampusRequests = async (req, res) => {
  try {
    const requests = await OffCampusRequest.find().populate("company_id");
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching off-campus requests", error });
  }
};

// Update OffCampusRequest by ID
exports.updateOffCampusRequest = async (req, res) => {
  try {
    const { course, company_id, details } = req.body;

    const updatedRequest = await OffCampusRequest.findByIdAndUpdate(
      req.params.id,
      { course, company_id, details },
      { new: true }
    );
    if (!updatedRequest)
      return res.status(404).json({ message: "Off-campus request not found" });

    res.status(200).json(updatedRequest);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating off-campus request", error });
  }
};

// Delete OffCampusRequest by ID
exports.deleteOffCampusRequest = async (req, res) => {
  try {
    const request = await OffCampusRequest.findByIdAndDelete(req.params.id);
    if (!request)
      return res.status(404).json({ message: "Off-campus request not found" });
    res
      .status(200)
      .json({ message: "Off-campus request deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting off-campus request", error });
  }
};
