const r = require('express').Router();
const c = require('../controllers/resume.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
r.get('/download', c.download);
r.post('/upload', auth, upload.single('resume'), c.upload);
module.exports = r;
