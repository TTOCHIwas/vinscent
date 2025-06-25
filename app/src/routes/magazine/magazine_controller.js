"use strict";

const User = require("../../models/users");
const Post = require("../../models/posts");

const render = {
    list: (req, res) => {
        res.render('magazine/magazine_page.ejs');
    },
    create: (req, res) => {
        res.render('magazine/magazine_page_text.ejs');
    },
    detail: (req, res) => {
        res.render('magazine/detail.ejs');
    },
    modify: (req, res) => {
        res.render('magazine/modify.ejs');
    }
};

const process = {
    create: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    modify: async (req, res) => {
        const user = new User(req.body);
        const response = await user.signup();
        return res.json(response);
    },
    comment: async (req, res) => {
        const user = new User(req.body);
        const response = await user.signup();
        return res.json(response);
    },
    like: async (req, res) => {
        const user = new User(req.body);
        const response = await user.signup();
        return res.json(response);
    },
    hide: async (req, res) => {
        const user = new User(req.body);
        const response = await user.signup();
        return res.json(response);
    },
    share: async (req, res) => {
        const user = new User(req.body);
        const response = await user.signup();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.signup();
        return res.json(response);
    }
};

module.exports = { render, process };