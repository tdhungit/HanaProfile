const express = require('express');

const authenticate = require('../core/Authenticate');

const Admin = require('../controllers/Admin');
const Auth = require('../controllers/Auth');

const router = express.Router();

router.get('/', authenticate, Admin.index.bind(Admin));

router.get('/auth', Auth.index.bind(Auth));
router.post('/auth', Auth.doLogin.bind(Auth));

module.exports = router;
