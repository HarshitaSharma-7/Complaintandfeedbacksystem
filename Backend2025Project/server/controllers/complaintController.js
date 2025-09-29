const { validationResult } = require('express-validator');


exports.getComplaintById = async (req, res) => {
try {
const complaint = await Complaint.findById(req.params.id).populate('createdBy', 'name email').populate('assignedTo', 'name email');
if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });
// only owner or admin/staff can view
if (complaint.createdBy._id.toString() !== req.user._id.toString() && !['admin','staff'].includes(req.user.role)) {
return res.status(403).json({ msg: 'Forbidden' });
}
res.json(complaint);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
};


exports.updateComplaint = async (req, res) => {
try {
const { title, description } = req.body;
const complaint = await Complaint.findById(req.params.id);
if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });
if (complaint.createdBy.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Forbidden' });


complaint.title = title || complaint.title;
complaint.description = description || complaint.description;
await complaint.save();
res.json(complaint);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
};


exports.deleteComplaint = async (req, res) => {
try {
const complaint = await Complaint.findById(req.params.id);
if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });
if (complaint.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });


await complaint.remove();
res.json({ msg: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
};