const server = require('./src/server.js');

server.listen(8080,(err=>{
  if (err) throw err;
  console.log('8080포트에서 서버 시작...');
}))