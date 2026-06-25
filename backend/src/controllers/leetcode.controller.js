const svc = require('../services/leetcode.service');

exports.profile = async (_req, res, next) => {
  try { res.json(await svc.getProfile()); } catch (e) { next(e); }
};

// GET /leetcode/calendar        → all-time (default "last 12 months" view)
exports.allCalendar = async (_req, res, next) => {
  try { res.json(await svc.getAllCalendar()); } catch (e) { next(e); }
};

// GET /leetcode/calendar/:year  → specific year (dropdown selection)
exports.calendar = async (req, res, next) => {
  try {
    const y = Number(req.params.year) || new Date().getFullYear();
    res.json(await svc.getCalendar(y));
  } catch (e) { next(e); }
};

exports.contestHistory = async (_req, res, next) => {
  try { res.json(await svc.getContestHistory()); } catch (e) { next(e); }
};