const r = require('express').Router();
const c = require('../controllers/github.controller');
r.get('/profile', c.profile);
r.get('/contributions/:year', c.contributions);
module.exports = r;
