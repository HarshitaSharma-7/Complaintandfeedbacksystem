const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


exports.register = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { name, email, password, role } = req.body;
try {
let user = await User.findOne({ email });
if (user) return res.status(400).json({ msg: 'User already exists' });


user = new User({ name, email, password, role });


const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);


await user.save();


const payload = { userId: user.id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });


res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};


exports.login = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ msg: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });


const payload = { userId: user.id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });


res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};


exports.me = async (req, res) => {
res.json(req.user);
};