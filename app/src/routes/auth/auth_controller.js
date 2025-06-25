const render = {
    login: (req, res) => {
        res.render('./auth/login_page.ejs');
    },
    signup: (req, res) => {
        res.render('./auth/signup_page.ejs');
    }
};

const process = {
};

module.exports = { render, process };