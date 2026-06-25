const svc = require('../services/github.service');
exports.profile = async (_req, res, next) => { try { res.json(await svc.getProfile()); } catch (e) { next(e); } };
exports.contributions = async (req, res, next) => {
  try {
    const y = Number(req.params.year) || new Date().getFullYear();
    res.json(await svc.getContributions(y));
  } catch (e) { next(e); }
};
