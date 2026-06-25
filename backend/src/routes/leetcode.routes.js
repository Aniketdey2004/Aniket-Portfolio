const r = require('express').Router();
const c = require('../controllers/leetcode.controller');
r.get('/profile', c.profile);
r.get('/calendar', c.allCalendar);
r.get('/calendar/:year', c.calendar);
r.get('/contest-history', c.contestHistory);
module.exports = r;
