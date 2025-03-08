const express = require('express');
const router = express.Router();
const controller = require('./gnb_controller');


router.get('/create', controller.render.post);
router.get('/notification', controller.render.notification);
router.get('/messages', controller.render.messages);
router.get('/mypage', controller.render.mypage);
router.get('/settings', controller.render.settings);
router.get('/dark', controller.render.dark);


router.post('/notification', controller.process.notification);
router.post('/messages', controller.process.messages);
router.post('/mypage', controller.process.mypage);
router.post('/settings', controller.process.settings);
router.post('/dark', controller.process.dark);

module.exports = router;