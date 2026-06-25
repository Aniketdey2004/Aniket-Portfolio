const mongoose = require('mongoose');
require("dotenv").config();

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;
  console.log(uri)
  if (!uri) {
    console.warn('[db] MONGO_URI is empty — set it in backend/.env');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('[db] mongo connected');
  } catch (err) {
    console.error('[db] connection error:', err.message);
  }
};
