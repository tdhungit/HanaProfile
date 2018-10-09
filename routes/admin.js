const express = require('express');

const authenticate = require('../core/Authenticate');

const Admin = require('../controllers/Admin');
const Auth = require('../controllers/Auth');

const router = express.Router();

router.get('/auth', Auth.index);
router.post('/auth', Auth.doLogin);
router.get('/logout', Auth.logout);

router.get('/', authenticate, Admin.index);
router.get('/settings', authenticate, Admin.settings);
router.post('/settings', authenticate, Admin.saveSettings);
router.get('/settings-apply', authenticate, Admin.applySettings);
router.get('/profile', authenticate, Admin.profile);
router.post('/profile', authenticate, Admin.uploadProfileFields(), Admin.updateProfile);

module.exports = router;
