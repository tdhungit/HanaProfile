const express = require('express');
const router = express.Router();
const Index = require('../controllers/Index');

/* GET home page. */
router.get('/', Index.index);
router.post('/send-mail', Index.sendMessage);
router.get('/blog', Index.blog);
router.get('/*-p:id', Index.blogDetail);

router.get('/install', Index.install);

module.exports = router;
