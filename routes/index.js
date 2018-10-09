const express = require('express');
const router = express.Router();
const Index = require('../controllers/Index');

/* GET home page. */
router.get('/', Index.index.bind(Index));

router.get('/install', Index.install.bind(Index));

module.exports = router;
