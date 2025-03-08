const db = require('../database.js');

exports.getLikesOnPost = (postId, callback) => {
    db.query(`SELECT * FROM like_post WHERE post_id=${postId}`, (err, rows) => {
        try{
            console.log("게시글 좋아요 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getLikesOnComment = (commentId, callback) => {
    db.query(`SELECT * FROM like_comment WHERE comment_id=${commentId}`, (err, rows) => {
        try{
            console.log("댓글 좋아요 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getLikeOnPostByUser = (postId, userId, callback) => {
    db.query(`SELECT * FROM like_post WHERE user_id=${userId} AND post_id=${postId}`, (err, rows) => {
        try{
            console.log("회원 게시글 좋아요 기록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getLikeOnCommentByUser = (commentId, callback) => {
    db.query(`SELECT * FROM like_comment WHERE user_id=${userId} AND comment_id=${commentId}`, (err, rows) => {
        try{
            console.log("회원 댓글 좋아요 기록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.postLikeOnPost = (postId, userId, callback) => {
    db.query(`INSERT INTO like_post (user_id, post_id) VALUES ('${userId}', '${postId}');`,
    (err, rows) => {
        try{
            
            console.log("게시글 좋아요 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.postLikeOnComment = (commentId, userId, callback) => {
    db.query(`INSERT INTO like_comment (user_id, comment_id) VALUES ('${userId}', '${commentId}');`,
    (err, rows) => {
        try{
            console.log("댓글 좋아요 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.deleteLikeOnPost = (postId, userId, callback) => {
    console.log("좋아요 삭제 게시글 아이디 : ", postId);
    db.query(`DELETE FROM like_post WHERE post_id=${postId} AND user_id=${userId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.deleteLikeOnComment = (commentId, userId, callback) => {
    console.log("좋아요 삭제 댓글 아이디 : ", commentId);
    db.query(`DELETE FROM like_comment WHERE comment_id=${commentId} AND user_id=${userId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};
