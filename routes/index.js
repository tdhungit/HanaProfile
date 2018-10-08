const express = require('express');
const router = express.Router();
const index = require('../controllers/index');
const auth = require('../controllers/auth');

/* GET home page. */
router.get('/', index.index);

router.get('/install', index.install);

router.get('/admin/auth', auth.index);
router.post('/admin/auth', auth.doLogin);

module.exports = router;
