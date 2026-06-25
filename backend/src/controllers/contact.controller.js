const { sendContactMail } = require('../services/mailer.service');
exports.send = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !subject || !message) return res.status(400).json({ error: 'All fields are required' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
    await sendContactMail({ name, email, subject, message });
    res.json({ ok: true });
  } catch (e) { next(e); }
};
