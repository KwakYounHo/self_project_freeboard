const DB   = require('./modules/DBconfig.js');
const http = require('http');

DB.connect((err)=>{if (err) throw err; console.log('DB connected...')})
module.exports = http.createServer(async (req,rep)=>{
  try {
    if (req.method === 'GET') {
      switch (ture) {
        case req.url === '/' :
          
      }
    }
  } catch (e) {
    rep.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});
    rep.end('서버 연결에 실패하였습니다.')
  }
})