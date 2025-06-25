const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PW,
  port : process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promise 기반으로 query 실행 가능하게 export
module.exports = pool.promise();