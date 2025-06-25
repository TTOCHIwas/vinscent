const db = require('../../database.js');

exports.getUsers = (callback) => {
    db.query("SELECT * FROM user", (err, rows) => {
        try{
            console.log("사용자 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        };
    });
};

exports.getUsersByFollowing = (userId, callback) => {
    db.query(`SELECT * FROM follow AS F JOIN user AS U ON F.user_id=U.user_id WHERE U.user_id=${userId}`, (err, rows) => {
        try{
            console.log("팔로잉 목록: ", rows);
            callback(rows);
        }catch(err){
            throw err;
        };
    });
};

exports.getUsersByFollower = (userId, callback) => {
    db.query(`SELECT * FROM follow AS F JOIN user AS U ON F.target_id=U.user_id WHERE U.user_id=${userId}`, (err, rows) => {
        try{
            console.log("팔로워 목록: ", rows);
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


exports.findOne = (userId, callback) => {
    db.query(`SELECT * FROM user WHERE user_id=${userId}`, (err, rows) => {
        try{
            console.log("사용자 정보 : ", rows);
            callback(rows[0]);
        }catch(err){
            throw err;
        }
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

exports.postUserTerm = (data, callback) => {
    db.query(`INSERT INTO user_term (user_id, term_id) VALUES ('${data.userId}', '${data.adalt}'), ('${data.userId}', '${data.store}'),('${data.userId}', '${data.marketing}'),('${data.userId}', '${data.ap}')`,
    (err, rows) => {
        try{
            console.log("약관 수정 완료", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
}

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

exports.patchUserTermAdd = (userId, termId, callback) => {
    db.query(`INSERT INTO user_term (user_id, term_id) VALUE ('${userId}', '${termId}')`,
    (err, rows) => {
        try{
            console.log("약관 수정 완료", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};


exports.patchUserTermDel = (userId, termId, callback) => {
    db.query(`DELETE FROM user_term WHERE user_id=${userId} AND term_id=${termId}')`,
    (err, rows) => {
        try{
            console.log("약관 수정 완료", rows);
            callback(rows);
        }catch{
            throw err;
        }
    });
};