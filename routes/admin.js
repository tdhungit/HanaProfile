const express = require('express');

const admin = require('../controllers/admin');
const auth = require('../core/Authenticate');

const router = express.Router();

/* GET users listing. */
router.get('/', auth, admin.index);

module.exports = router;
