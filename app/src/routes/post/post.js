"use strict";

const express = require('express');
const router = express.Router();
const controller = require('./post_controller');
const convertUUID = require('../middlewares/convertUUID');

// RENDER
router.get('/board/:category/:sortBy', convertUUID('post_id'), controller.render.board);
router.get('/create', controller.render.create);
router.get('/detail/:id', controller.render.detail);
router.get('/modify/:id', controller.render.modify);

// PROCESS
router.post('/create', controller.process.create);
router.post('/modify', controller.process.modify);
router.post('/comment',controller.process.comment);
router.post('/like', controller.process.like);
router.post('/hide', controller.process.hide);
router.post('/share', controller.process.share);
router.post('/register', controller.process.register);

module.exports = router;