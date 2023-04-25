import mysql  from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({path : '.env'});

// export default mysql.createConnection({
  // host     : process.env.mysqlHost,
  // user     : process.env.mysqlUser,
  // port     : process.env.mysqlPort,
  // password : process.env.mysqlPassword,
  // database : process.env.mysqlDatabase,
// });

class DBConnector{
  constructor(user,password) {
    this.host     = process.env.mysqlHost;
    this.user     = user;
    this.port     = process.env.mysqlPort;
    this.password = password;
    this.database = process.env.mysqlDatabase;
  }
}

export default function (user, password) {
  return mysql.createConnection(new DBConnector);
}