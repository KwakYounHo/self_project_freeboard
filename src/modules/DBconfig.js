const mysql  = require('mysql2');
const dotenv = require('dotenv').config({path : '../../.env'});
const path   = require('path');
const fs     = require('fs');

module.exports = mysql.createConnection({
  host     : process.env.mysqlHost,
  user     : process.env.mysqlUser,
  port     : process.env.mysqlPort,
  password : process.env.mysqlPassword,
  database : process.env.mysqlDatabase,
});