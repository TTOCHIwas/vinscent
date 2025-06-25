const db = require('../../database.js');

exports.getCategorys = async () => {
    try{
        const [rows] = await db.query('SELECT category_id, category_title FROM vinscent_main_db.category;');
        if(rows.length == 0)
        {
            throw new Error('데이터가 없음');
        }
        console.log("카테고리 목록: ", rows);
        return rows;
    }catch(err){
        console.error('[getCategorys] Error:', err.message);
        return null;
    }
  };

  exports.getCategoryId = async (cat) => {
    try{
        const [rows] = await db.query(`SELECT category_id FROM vinscent_main_db.category WHERE category_title='${cat}';`);
        if(rows.length == 0)
        {
            throw new Error('데이터가 없음');
        }
        console.log("Id : ", rows);
        return rows;
    }catch(err){
        console.error('[getCategoryId] Error:', err.message);
        return null;
    }
  };
