const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');

const app = express();


app.set('trust proxy', 1);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const limiter = rateLimit({ windowMs: 60_000, max: 120 });
app.use('/api/', limiter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/experiences', require('./routes/experience.routes'));
app.use('/api/blogs', require('./routes/blog.routes'));
app.use('/api/leetcode', require('./routes/leetcode.routes'));
app.use('/api/github', require('./routes/github.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/resume', require('./routes/resume.routes'));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);

module.exports = app;
