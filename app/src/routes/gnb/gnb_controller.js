const User = require("../../models/users");

const render = {
    post: (req, res) => {
        res.render('app\src\views\post_board_page.ejs')
    }
}

const process = {
    
}

module.exports = {render, process};