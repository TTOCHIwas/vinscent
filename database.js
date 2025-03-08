const mysql = require('mysql2');

require('dotenv').config();
    
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PW,
  port : process.env.MYSQL_PORT
});

 const connectDB = db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});
module.exports = connectDB;