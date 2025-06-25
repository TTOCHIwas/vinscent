const express = require('express');
const router = express.Router();
const controller = require('./home_controller');

// RENDER
router.get('/', controller.render.index);
router.get('/login', controller.render.login);
router.get('/signup', controller.render.signup);
router.get('/create', controller.render.create);
router.get('/notice', controller.render.notice);
router.get('/messages', controller.render.messages);
router.get('/mypage', controller.render.mypage);
router.get('/settings', controller.render.settings);
router.get('/aboutus', controller.render.aboutus);

// PROCESS
// router.post('/notice', controller.process.notice);
// router.post('/messages', controller.process.messages);
// router.post('/mypage', controller.process.mypage);
// router.post('/settings', controller.process.settings);
// router.post('/dark', controller.process.dark);

module.exports = router;
