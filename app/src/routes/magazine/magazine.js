"use strict";

const express = require('express');
const router = express.Router();
const controller = require('./magazine_controller');

// RENDER
router.get('/list', controller.render.list);
router.get('/create/:u_id', controller.render.create);
router.get('/detail', controller.render.detail);
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