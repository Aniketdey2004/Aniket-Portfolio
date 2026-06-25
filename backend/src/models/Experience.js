const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: String,
  startDate: String,
  endDate: String,
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  bullets: [String],
}, { timestamps: true });
module.exports = mongoose.model('Experience', schema);
