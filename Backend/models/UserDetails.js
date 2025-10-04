// models/UserDetails.js
const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  bio: { type: String },
  resumeUrl: { type: String },  // path or URL to uploaded resume
}, { timestamps: true });

module.exports = mongoose.model('UserDetails', userDetailsSchema);
