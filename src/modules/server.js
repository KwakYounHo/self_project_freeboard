import http from 'http';
import fs, { write }   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ! root 디렉토리 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const root       = path.join(__dirname,'../../');

export default http.createServer((req,rep)=>{
  // ! 요청 응답 함수
  const Mrep = (stateCode,type,write)=> {
    rep.writeHead(stateCode, {'Content-Type':`${type}; charset=utf-8`});
    if (Array.isArray(write)) {
      write.forEach(element=>{
        if (element.includes('.html')) {
          rep.write(fs.readFileSync(path.join(root,'/HTML/',element),'utf-8'));
        } else {
          rep.write(element)
        }
      })
    }
    rep.end();
  }
  try {
    if (req.method === 'GET') {
      switch (true) {
        case req.url === '/' :
          Mrep(200,'text/html',['index.html']);
          break
        case req.url.includes('/HTML/index.html') :
          Mrep(200,'text/html',['index.html']);
          break
        default : 
          try {
            console.log(`응답 작성 안한 페이지 자동 응답 : ${req.url}`)
            rep.end(fs.readFileSync(path.join(root,req.url),'utf-8'));
          } catch (e) {
            console.log(`없는 페이지 요청 : ${req.url}`);
            Mrep(200,'text/html',['<h1>요청하신 페이지는 없는 페이지 입니다. (404 Not found)</h1>'])
            rep.end();
          }
      }
    }
  } catch (e) {
    rep.writeHead(500,{'Content-Type':'text/plain'});
    rep.write('<h1>네트워크 요청 오류</h1>');
    console.log(`요청 url : ${req.url}`);
    console.error(e);
    rep.end();
  }
})