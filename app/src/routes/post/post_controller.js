"use strict";

const User = require("../../models/users");
const Post = require("../../models/posts");
const Cats = require("../../models/categorys");

const render = {
    
    board: async (req, res, next) => {
        try {
            const cat = req.params._category;
            const sort = req.params._sortBy;
            let result;

            switch (sort)
            {
                case 'like':
                    result = await Post.getPostsCategoryOrderByLike(Cats.getCategoryId(cat));
                    break;
                case 'comment':
                    result = await Post.getPostsCategoryOrderByComment(Cats.getCategoryId(cat));
                    break;
                default:
                    result = await Post.getPosts();
                    break;
            }
          next();
          if (!result) {
            return res.status(404).json({ message: '게시글이 없습니다.' });
          }
          res.render('post/post_board_page.ejs',{posts : result, category : cat, sort : sort});
        } catch (err) {
          console.error('[board] Error:', err.message);
          res.status(500).json({ message: '서버 에러 발생' });
          res.status(404).send("<script>alert('페이지 형식이 올바르지 않습니다.');</script>");
        }
    },
    create: (req, res) => {
        res.render('post/create_page_text.ejs');
    },

    detail: async (req, res) => {
        try {
            const id = req.params.id;
            const idHex = id.toString('hex');
            let result;
            
            result = await Post.getPost(idHex);  // getPosts 호출
            if (!result) {
                return res.status(404).json({ message: '게시글이 없습니다.' });
            }
            res.render('post/detail.ejs',{});
        } catch (err) {
          console.error('[board] Error:', err.message);
          res.status(500).json({ message: '서버 에러 발생' });
          res.status(404).send("<script>alert('페이지 형식이 올바르지 않습니다.');</script>");
        }
    },
    modify: (req, res) => {
        res.render('post/modify.ejs');
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