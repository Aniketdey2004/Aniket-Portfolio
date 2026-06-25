const path = require('path');
const fs = require('fs');
const RESUME = path.join(__dirname, '..', 'uploads', 'Aniket_Dey_Resume.pdf');

exports.download = (_req, res) => {
  if (!fs.existsSync(RESUME)) return res.status(404).json({ error: 'Resume not available' });
  res.download(RESUME, 'Aniket_Dey_Resume.pdf');
};

exports.upload = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ ok: true, filename: req.file.filename });
};
