const User = require("../../models/users");

const render = {
    index: (req, res) => {
        
        res.render('./home/index.ejs', );
    },
    login: (req, res) => {
        res.render('./auth/login_page.ejs');
    },
    post: (req, res) => {
        res.render('./post/post_board_page.ejs');
    },
    magazine: (req, res) => {
        res.render('./magazine/magazine_board_page.ejs');
    },
    product: (req, res) => {
        res.render('./product/product_board_page.ejs');
    },
    signup: (req, res) => {
        res.render('./auth/signup_page.ejs');
    },
    create: (req, res) => {
        res.render('./post/create_page_text.ejs');
    },
    aboutus: (req, res) => {
        res.render('./home/aboutus_page.ejs');
    },
    notice: (req, res) => {
    },
    messages: (req, res) => {
    },
    mypage: (req, res) => {
    },
    settings: (req, res) => {
    }
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    }
};

module.exports = { render, process };