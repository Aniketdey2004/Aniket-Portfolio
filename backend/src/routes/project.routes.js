const r = require('express').Router();
const c = require('../controllers/project.controller');
const auth = require('../middleware/auth');
r.get('/', c.list);
r.get('/:id', c.get);
r.post('/', auth, c.create);
r.put('/:id', auth, c.update);
r.delete('/:id', auth, c.remove);
module.exports = r;
