const mongoose = require('mongoose');


const ComplaintSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String, required: true },
type: { type: String, enum: ['complaint', 'feedback'], default: 'complaint' },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
status: { type: String, enum: ['pending', 'under review', 'resolved'], default: 'pending' },
assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
comments: [{ text: String, by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, at: { type: Date, default: Date.now } }],
createdAt: { type: Date, default: Date.now },
resolvedAt: { type: Date }
});


module.exports = mongoose.model('Complaint', ComplaintSchema);