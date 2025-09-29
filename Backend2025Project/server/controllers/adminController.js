const Complaint = require("../models/Complaint");

// Get all complaints (admin)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("createdBy", "name email role");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dashboard stats
exports.getStats = async (req, res) => {
  try {
    const pending = await Complaint.countDocuments({ status: "pending" });
    const review = await Complaint.countDocuments({ status: "under review" });
    const resolved = await Complaint.countDocuments({ status: "resolved" });

    res.json({ pending, review, resolved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
