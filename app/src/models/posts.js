const db = require('../../database.js');

exports.getPosts = async () => {
    try{
        const [rows] = await db.query('SELECT p.post_id, i.image_url FROM post p LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 GROUP BY p.post_id, i.image_url ORDER BY p.post_created_date DESC;');
        if(rows.length == 0)
        {
            throw new Error('데이터가 없음');
        }
        return rows;
    }catch(err){
        console.error('[getPost] Error:', err.message);
        return null;
    }
  };

exports.getPostsCategory = async (category) => {
    try{
        const [rows] = await db.query(`SELECT p.post_id, i.image_url FROM post p LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 AND p.category_id='${category}' GROUP BY p.post_id, i.image_url ORDER BY p.post_created_date DESC;`);
        if(rows.length == 0)
        {
            throw new Error('데이터가 없음');
        }
        return rows;
    }catch(err){
        console.error('[getPostsCategory] Error:', err.message);
        return null;
    }
};


exports.getPostsCategoryOrderByLike = async (category) => {
    try{
        const [rows] = await db.query(`SELECT p.post_id, COALESCE(COUNT(pl.like_id), 0) AS like_count,i.image_url FROM post p LEFT JOIN like_post pl ON p.post_id = pl.post_id LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 AND p.category_id='${category}' GROUP BY p.post_id, i.image_url ORDER BY like_count DESC;`);
        if(rows.length == 0)
        {
            throw new Error('데이터가 없음');
        }
        return rows;
    }catch(err){
        console.error('[getPostsCategoryOrderByLike] Error:', err.message);
        return null;
    }
};

exports.getPostsCategoryOrderByComment = async () => {
    try{
        const [rows] = await db.query(`SELECT p.post_id, p.post_title, COALESCE(COUNT(co.comment_id), 0) AS comment_count,i.image_url FROM post p LEFT JOIN comment co ON p.post_id = co.post_id LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 GROUP BY p.post_id, i.image_url ORDER BY comment_count DESC;`);
        if(rows.length == 0)
        {
            throw new Error('데이터가 없음');
        }
        return rows;
    }catch(err){
        console.error('[getPostsCategoryOrderByComment] Error:', err.message);
        return null;
    }
};

exports.getPostsOrderByLike = (callback) => {
    db.query("SELECT p.post_id, p.post_title, COALESCE(COUNT(pl.like_id), 0) AS like_count,i.image_url FROM post p LEFT JOIN like_post pl ON p.post_id = pl.post_id LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 GROUP BY p.post_id, i.image_url ORDER BY like_count DESC;", (err, rows) => {
        try{
            console.log("게시글 좋아요순 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getPostsOrderByLike = (callback) => {
    db.query("SELECT p.post_id, p.post_title, COALESCE(COUNT(pl.like_id), 0) AS like_count,i.image_url FROM post p LEFT JOIN like_post pl ON p.post_id = pl.post_id LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 GROUP BY p.post_id, i.image_url ORDER BY like_count DESC;", (err, rows) => {
        try{
            console.log("게시글 좋아요순 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getMagazines = (callback) => {
    db.query("SELECT p.post_id, i.image_url FROM post p LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 1 GROUP BY p.post_id, i.image_url ORDER BY p.post_created_date DESC;", (err, rows) => {
        try{
            console.log("메거진 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getImage = (postId, callback) => {
    db.query(`SELECT PI.image_url, PI.image_index FROM post_image AS PI JOIN post AS P ON PI.post_id=P.post_id WHERE PI.post_id=${postId};`, (err, rows) => {
        try{
            console.log("게시글 사진 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getPostsByUser = (userId, callback) => {
    db.query(`SELECT p.post_id, i.image_url FROM post p LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 AND p.user_id = ${userId} GROUP BY p.post_id, i.image_url ORDER BY p.post_created_date DESC;`, (err, rows) => {
        try{
            console.log("회원 게시글 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getUserPostsByLike = (userId, callback) => {
    db.query(`SELECT p.post_id, p.post_title, COALESCE(COUNT(pl.like_id), 0) AS like_count,i.image_url FROM post p LEFT JOIN like_post pl ON p.post_id = pl.post_id LEFT JOIN post_image i ON p.post_id = i.post_id AND i.image_index = 0 WHERE p.magazine = 0 AND p.user_id=${userId} GROUP BY p.post_id, i.image_url ORDER BY like_count DESC;`, (err, rows) => {
        try{
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getPostsByProduct = (productId, callback) => {
    db.query(`SELECT * FROM tag_product AS T JOIN post AS P ON T.post_id=P.post_id WHERE T.product_id='${productId}'`, (err, rows) => {
        try{
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getPostsBySearch = (input, callback) => {
    db.query(`SELECT * FROM post WHERE post_title OR post_content LIKE '${input}'`, (err, rows) => {
        try{
            console.log("게시글 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getPostsByBookmark = (userId, callback) => {
    db.query(`SELECT * FROM post AS P JOIN bookmark_post AS B ON P.post_id=B.post_id WHERE B.user_id=${userId}`, (err, rows) => {
        try{
            console.log("회원 북마크 게시글 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getPostsByCategory = (category, callback) => {
    db.query(`SELECT * FROM post WHERE category_id=${category}`, (err, rows) => {
        try{
            console.log("게시글 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getMagazines = (callback) => {
    db.query(`SELECT * FROM post AS P JOIN user AS U ON P.user_id=U.user_id WHERE U.user_brand=1`, (err, rows) => {
        try{
            console.log("메거진 목록 : ", rows);
            callback(rows);
        }catch(err){
            throw err;
        }
    });
};

exports.getPost = async (postId) => {
    try{
        const [rows] = await db.query(`SELECT * FROM post WHERE post_id="${postId}"`);
        if(rows.length == 0)
        {
            throw new Error('데이터가 없음');
        }
        console.log("게시글 정보: ", rows);
        return rows;
    }catch(err){
        console.error('[getPost] Error:', err.message);
        return null;
    }
  };


exports.postPost = (data, callback) => {
    db.query(`INSERT INTO post (user_id, post_content, post_status, post_privacy) VALUES ('${data.userId}', '${data.content}', '${data.status}', '${data.privacy}');`,
    (err, rows) => {
        try{
            console.log("게시글 게시 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.postPostImage = (data, callback) =>{
    db.query(`INSERT INTO post_image (post_id, image_url, image_index) VALUES ('${data.id}', '${data.image}', '${data.index}');`,
    (err, rows) => {
        try{
            console.log("게시글 이미지 저장 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.postPostTagProduct = (data, callback) =>{
    db.query(`INSERT INTO tag_product (post_id, product_id) VALUES ('${data.postId}', '${data.productId}');`,
    (err, rows) => {
        try{
            console.log("게시글 제품 태그 저장 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.deletePost = (postId, callback) => {
    console.log("삭제 대상 아이디 : ", postId);
    db.query(`DELETE FROM post WHERE post_id=${postId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.patchPost = (data, callback) => {
    console.log("수정 데이터 확인" , data);
    db.query(`UPDATE post SET ${data} WHERE post_id=${data.postId}`, (err, rows) => {
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
    db.query(`UPDATE post SET '${data}' WHERE post_id=${data.postId}`, (err, rows) => {
        try{
            console.log("수정 확인" , rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};