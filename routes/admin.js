const express = require('express');

const authenticate = require('../core/Authenticate');

const Admin = require('../controllers/Admin');
const Auth = require('../controllers/Auth');
const Skills = require('../controllers/Skills');
const Experiences = require('../controllers/Experiences');
const Portfolios = require('../controllers/Portfolios');
const Blogs = require('../controllers/Blogs');
const Pages = require('../controllers/Pages');

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

router.get('/experiences', authenticate, Experiences.list);
router.post('/experiences/save', authenticate, Experiences.save);
router.get('/experiences/create', authenticate, Experiences.edit);
router.get('/experiences/edit/:id', authenticate, Experiences.edit);

router.get('/portfolios', authenticate, Portfolios.list);
router.post('/portfolios/save', authenticate, Portfolios.save);
router.get('/portfolios/create', authenticate, Portfolios.edit);
router.get('/portfolios/edit/:id', authenticate, Portfolios.edit);

router.get('/blogs', authenticate, Blogs.list);
router.post('/blogs/save', authenticate, Blogs.save);
router.get('/blogs/create', authenticate, Blogs.edit);
router.get('/blogs/edit/:id', authenticate, Blogs.edit);

router.get('/pages', authenticate, Pages.list);
router.post('/pages/save', authenticate, Pages.save);
router.get('/pages/create', authenticate, Pages.edit);
router.get('/pages/edit/:id', authenticate, Pages.edit);

module.exports = router;
