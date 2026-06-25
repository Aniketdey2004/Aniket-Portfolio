const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  content: { type: String, required: true },
  coverImage: String,
  tags: [String],
  published: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Blog', schema);
