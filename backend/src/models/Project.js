const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: String,
  description: { type: String, required: true },
  techStack: [String],
  features: [String],
  githubUrl: String,
  liveUrl: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Project', schema);
