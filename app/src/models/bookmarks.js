const db = require('../database.js');

exports.getBookmarkOnPost = (postId, callback) => {
    db.query(`SELECT * FROM bookmark_post WHERE post_id=${postId}`, (err, rows) => {
        try{
            console.log("게시글 북마크 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getBookmarkOnProduct = (productId, callback) => {
    db.query(`SELECT * FROM bookmark_product WHERE product_id=${productId}`, (err, rows) => {
        try{
            console.log("제품 북마크 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getBookmarkOnPostByUser = (postId, userId, callback) => {
    db.query(`SELECT * FROM bookmark_post WHERE user_id=${userId} AND post_id=${postId}`, (err, rows) => {
        try{
            console.log("회원 게시글 북마크 기록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getBookmarkOnProductByUser = (productId, userId, callback) => {
    db.query(`SELECT * FROM bookmark_product WHERE user_id=${userId} AND product_id=${productId}`, (err, rows) => {
        try{
            console.log("회원 게시글 북마크 기록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.postBookmarkOnPost = (postId, userId, callback) => {
    db.query(`INSERT INTO bookmark_post (user_id, post_id) VALUES ('${userId}', '${postId}');`,
    (err, rows) => {
        try{
            console.log("게시글 북마크 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.postBookmarkOnProduct = (productId, userId, callback) => {
    db.query(`INSERT INTO bookmark_product (user_id, product_id) VALUES ('${userId}', '${productId}');`,
    (err, rows) => {
        try{
            console.log("제품 북마크 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.deleteBookmarkOnPost = (postId, userId, callback) => {
    console.log("북마크 삭제 게시글 아이디 : ", postId);
    db.query(`DELETE FROM bookmark_post WHERE post_id=${postId} AND user_id=${userId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.deleteBookmarkOnProduct = (productId, userId, callback) => {
    console.log("좋아요 삭제 제품 아이디 : ", productId);
    db.query(`DELETE FROM bookmark_product WHERE product_id=${productId} AND user_id=${userId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};
