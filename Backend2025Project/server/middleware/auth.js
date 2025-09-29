const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const auth = async (req, res, next) => {
const token = req.header('Authorization')?.replace('Bearer ', '');
if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });


try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.userId).select('-password');
if (!req.user) return res.status(401).json({ msg: 'Invalid token user' });
next();
} catch (err) {
console.error(err);
res.status(401).json({ msg: 'Token is not valid' });
}
};


const requireRole = (roles = []) => (req, res, next) => {
if (!Array.isArray(roles)) roles = [roles];
if (!req.user) return res.status(401).json({ msg: 'Unauthorized' });
if (!roles.includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden: insufficient role' });
next();
};


module.exports = { auth, requireRole };