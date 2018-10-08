const express = require('express');
const router = express.Router();
var users = require('../controllers/users');

/* GET users listing. */
router.get('/', users.index);

module.exports = router;
