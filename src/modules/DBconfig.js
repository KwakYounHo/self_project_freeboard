import mysql  from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({path : '.env'});

export default mysql.createConnection({
  host     : process.env.mysqlHost,
  user     : process.env.mysqlUser,
  port     : process.env.mysqlPort,
  password : process.env.mysqlPassword,
  database : process.env.mysqlDatabase,
});