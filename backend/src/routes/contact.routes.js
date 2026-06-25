const r = require('express').Router();
const c = require('../controllers/contact.controller');
r.post('/', c.send);
module.exports = r;
