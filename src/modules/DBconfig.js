const mysql  = require('mysql2');
const dotenv = require('dotenv').config({path : '.env'});

module.exports = mysql.createConnection({
  host     : process.env.mysqlHost,
  user     : process.env.mysqlUser,
  port     : process.env.mysqlPort,
  password : process.env.mysqlPassword,
  database : process.env.mysqlDatabase,
});