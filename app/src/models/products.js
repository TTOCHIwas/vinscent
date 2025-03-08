const db = require('../database.js');

exports.getProducts = (callback) => {
    db.query("SELECT * FROM product", (err, rows) => {
        try{
            console.log("제품 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        };
    });
};

exports.getProductsByBrand = (brandId, callback) => {
    db.query(`SELECT * FROM product WHERE brand_id=${brandId}`, (err, rows) => {
        try{
            console.log("브랜드 제품 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        };
    });
};

exports.getProductsByType = (typeId, callback) => {
    db.query(`SELECT * FROM product WHERE type_id=${typeId}`, (err, rows) => {
        try{
            console.log("브랜드 제품 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        };
    });
};

exports.getUsersBySearch = (input, callback) => {
    db.query(`SELECT * FROM user WHERE user_id LIKE '${input}'`, (err, rows) => {
        try{
            console.log("팔로잉 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        };
    });
};

exports.getUser = (userId, callback) => {
    db.query(`SELECT * FROM user WHERE user_id=${userId}`, (err, rows) => {
        try{
            console.log("사용자 정보 : ", rows);
            callback(rows[0]);
        }catch(err){
            throw err;
        }
    });
};

exports.getUserTerms = (userId, callback) => {
    db.query(`SELECT * FROM user_term AS UT JOIN user AS U ON UT.user_id=U.user_id JOIN term AS T ON UT.term_id=T.term_id WHERE U.user_id='${userId}'`, (err, rows) => {
        try{
            console.log("사용자 정보 : ", rows);
            callback(rows[0]);
        }catch(err){
            throw err;
        }
    });
};

exports.postUser = (data, callback) => {
    db.query(`INSERT INTO user (user_id, user_tagid, user_password, user_name, user_gender, user_phone_num, user_birthday, user_brand) VALUES ('${data.id}', '${data.tagId}', '${data.password}', '${data.name}', '${data.gender}', '${data.phone}', '${data.birthday}', '${data.brand}')`,
    (err, rows) => {
        try{
            console.log("회원가입 완료", rows);
            callback(rows.insertId);
        }catch{
            throw err;
        }
    });
};

exports.deleteUser = (userId, callback) => {
    console.log("삭제 대상 아이디 : ", userId);
    db.query(`DELETE FROM user WHERE id=${userId}`, (err, rows) => {
        try{
            console.log("삭제 완료 ", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.patchUser = (data, callback) => {
    console.log("수정 데이터 확인" , data);
    db.query(`UPDATE user SET ${data} WHERE user_id=${data.userId}`, (err, rows) => {
        try{
            console.log("수정 확인" , rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};

exports.patchUserTermAdd = (userid, termid, callback) => {
    db.query(`INSERT INTO user_term (user_id, term_id) VALUE ('${userid}', '${termid}')`,
    (err, rows) => {
        try{
            console.log("약관 수정 완료", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};


exports.patchUserTermDel = (userid, termid, callback) => {
    db.query(`DELETE FROM user_term WHERE user_id=${userid} AND term_id=${termid}')`,
    (err, rows) => {
        try{
            console.log("약관 수정 완료", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};