const express = require('express');

const authenticate = require('../core/Authenticate');

const Admin = require('../controllers/Admin');
const Auth = require('../controllers/Auth');
const Skills = require('../controllers/Skills');

const router = express.Router();

router.get('/auth', Auth.index);
router.post('/auth', Auth.doLogin);
router.get('/logout', Auth.logout);

router.get('/', authenticate, Admin.index);
router.get('/settings', authenticate, Admin.settings);
router.post('/settings', authenticate, Admin.saveSettings);
router.get('/settings-apply', authenticate, Admin.applySettings);
router.get('/profile', authenticate, Admin.profile);
router.post('/profile', authenticate, Admin.updateProfile);

router.get('/skills', authenticate, Skills.list);
router.post('/skills/save', authenticate, Skills.save);
router.get('/skills/create', authenticate, Skills.edit);
router.get('/skills/edit/:id', authenticate, Skills.edit);

module.exports = router;
