const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { createComplaint, getMyComplaints, updateStatus } = require("../controllers/complaintController");

router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);
router.put("/:id", protect, updateStatus); // Only admin in frontend should call

module.exports = router;
