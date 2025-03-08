const db = require('../database.js');

exports.getCommentsByUser = (userId, callback) => {
    db.query(`SELECT * FROM comment WHERE user_id=${userId}`, (err, rows) => {
        try{
            console.log("회원 댓글 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getCommentsOnPost = (postId, callback) => {
    db.query(`SELECT * FROM comment WHERE post_id=${postId}`, (err, rows) => {
        try{
            console.log("게시글 댓글 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getCommentsOnComment = (commentId, callback) => {
    db.query(`SELECT * FROM comment WHERE parent_comment_id='${commentId}'`, (err, rows) => {
        try{
            console.log("대댓글 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.postComment = (data, callback) => {
    db.query(`INSERT INTO comment (user_id, post_id, content) VALUES ('${data.userId}', '${data.postId}', '${data.content}');`,
    (err, rows) => {
        try{
            console.log("게시글 댓글 게시 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.postCommentReply = (data, callback) => {
    db.query(`INSERT INTO comment (user_id, post_id, content, parent_comment_id) VALUES ('${data.userId}', '${data.postId}', '${data.content}', '${data.parentId}');`,
    (err, rows) => {
        try{
            console.log("게시글, 대댓글 게시 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.deleteComment = (commentId, callback) => {
    console.log("삭제 대상 아이디 : ", commentId);
    db.query(`DELETE FROM comment WHERE comment_id=${commentId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.deleteCommentsOnPost = (postId, callback) => {
    console.log("삭제 대상 아이디 : ", postId);
    db.query(`DELETE FROM comment WHERE post_id=${postId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.deleteReplyOnComments = (commentId, callback) => {
    console.log("삭제 대상 아이디 : ", commentId);
    db.query(`DELETE FROM comment WHERE parent_comment_id=${commentId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.patchComment = (data, callback) => {
    console.log("수정 데이터 확인" , data);
    db.query(`UPDATE comment SET content='${data.content}' WHERE comment_id=${data.commentId}`, (err, rows) => {
        try{
            console.log("수정 확인" , rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.patchPostImage = (data, callback) => {
    console.log("수정 데이터 확인" , data);
    db.query(`UPDATE post_image SET image_url=${data.image}, image_index=${data.index} WHERE image_id=${data.id}`, (err, rows) => {
        try{
            console.log("수정 확인" , rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.patchMagazine = (data, callback) => {
    console.log("수정 데이터 확인" , data);
    db.query(`UPDATE post SET '${data}' WHERE post_id=${data.postid}`, (err, rows) => {
        try{
            console.log("수정 확인" , rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};