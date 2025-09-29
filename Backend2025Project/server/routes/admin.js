const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const { getAllComplaints, getStats } = require("../controllers/adminController");

router.get("/complaints", protect, adminOnly, getAllComplaints);
router.get("/stats", protect, adminOnly, getStats);

module.exports = router;
