import http from 'http';
import fs, { write }   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ! root 디렉토리 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const root       = path.join(__dirname,'../../');

export default http.createServer((req,rep)=>{
  // ! 요청 응답 함수 =====================

  function getContentType () {
    switch (true) {
      case req.url.endsWith('.html') :
        return 'text/html'
      case req.url.endsWith('.js') :
        return 'text/javascript'
      case req.url.endsWith('.css') :
        return 'text/css'
      default :
        return 'text/plain'
    }
  }

  // * -------------------------------------- * //

  const Mrep = (stateCode,write,type=getContentType())=> {
    rep.writeHead(stateCode, {'Content-Type':`${type}; charset=utf-8`});
    if (Array.isArray(write)) {
      write.forEach(element=>{
        if (element.includes('.html')||element.includes('.js')||element.includes('.css')) {
          rep.write(fs.readFileSync(path.join(root,element),'utf-8'));
        } else {
          rep.write(element)
        }
      })
    }
    rep.end();
  }

  // ! ===================================

  // ? 요청 응답 처리하기 =================

  try {
    if (req.method === 'GET') {
      switch (true) {
        case req.url === '/' :
          Mrep(200,['Main.html'],'text/html');
          break
        case req.url.includes('/Main.html') :
          Mrep(200,['/Main.html']);
          break
        default : 
          try {
            console.log(`응답 작성 안한 페이지 자동 응답 : ${req.url}`)
            Mrep(200,[req.url])
            break
          } catch (e) {
            console.log(`없는 페이지 요청 : ${req.url}`);
            Mrep(200,['<h1>요청하신 페이지는 없는 페이지 입니다. (404 Not found)</h1>'],'text/html');
            break
          }
      }
    }
  } catch (e) {
    console.log(`네트워크 요청 오류  url : ${req.url}`);
    console.error(e);
    Mrep(500,['네트워크 요청 오류'],'text/plain')
  }
})

// ? ===================================