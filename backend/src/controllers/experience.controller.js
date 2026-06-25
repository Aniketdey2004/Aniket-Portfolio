const Model = require('../models/Experience');

exports.list = async (req, res, next) => { try { res.json(await Model.find().sort({ createdAt: -1 })); } catch (e) { next(e); } };
exports.get = async (req, res, next) => { try { const d = await Model.findById(req.params.id); if (!d) return res.status(404).json({error:'Not found'}); res.json(d); } catch (e) { next(e); } };
exports.create = async (req, res, next) => { try { res.status(201).json(await Model.create(req.body)); } catch (e) { next(e); } };
exports.update = async (req, res, next) => { try { const d = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!d) return res.status(404).json({error:'Not found'}); res.json(d); } catch (e) { next(e); } };
exports.remove = async (req, res, next) => { try { await Model.findByIdAndDelete(req.params.id); res.json({ ok: true }); } catch (e) { next(e); } };
