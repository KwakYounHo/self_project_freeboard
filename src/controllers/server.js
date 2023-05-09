import http              from 'http';
import fs                from 'fs';
import path              from 'path';
import { fileURLToPath } from 'url';
import DBConn            from '../modules/DBconfig.js';
import qs                from 'querystring';
import bcrypt            from 'bcrypt';
import { Server }        from 'socket.io';

// ? root 디렉토리 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const root       = path.join(__dirname,'../../');

const DB = DBConn(process.env.mysqlUser,process.env.mysqlPassword);
DB.connect(()=>console.log('root DB server running...'))

export default http.createServer((req,rep)=>{
  // ? 요청 응답 함수 =====================
  
  function getContentType () {
    switch (true) {
      case req.url.endsWith('.html') :
        return 'text/html'
      case req.url.endsWith('.js') :
        return 'text/javascript'
      case req.url.endsWith('.css') :
        return 'text/css'
      case req.url.endsWith('.ico') :
        return 'image/x-icon'
      default :
        return 'text/plain'
    }
  }

  // * -------------------------------------- * //

  const Mrep = (stateCode,write,type=getContentType())=> {
    rep.writeHead(stateCode, {'Content-Type':`${type}; charset=utf-8`});
    if (Array.isArray(write)) {
      write.forEach(element=>{
        if (element.endsWith('.html')||element.endsWith('.js')||element.endsWith('.css')) {
          rep.write(fs.readFileSync(path.join(root,element),'utf-8'));
        } else {
          rep.write(element);
        }
      })
    }
    rep.end();
  }

  // ? ===================================


  // ? 요청 응답 처리하기 =================

  try {
    if (req.method === 'GET') {
      //* Switch 시작-(GET)
      switch (true) {
        // * 최초 접속 ================================
        case req.url === '/' :
          Mrep(200,['/Main.html'],'text/html');
          break
        // * =========================================
        

        // * 아이콘 ==================================
        case req.url.includes('favicon.ico') :
          Mrep(200,['/facivon.ico'],'image/x-icon')
          break
        // * =========================================
        

        // * 메인 페이지 ==============================
        case req.url.includes('/Main.html') :
          Mrep(200,['/Main.html'],'text/html');
          break
        // * =========================================
        
        
        // * 회원가입 페이지 ===========================
        case req.url.includes('/CreateAccount/createAccount.html') :
          Mrep(200,['/CreateAccount/createAccount.html'],'text/html');
          break
        // * =========================================
        
        
        // * 게시판 뷰 페이지 요청 =====================
        case req.url.includes('/Community/board/View/') :
          if (req.url.endsWith('.js')) {
            Mrep(200,['/Community/board/View/View.js'],'text/javascript');
            break
          } else if (req.url.endsWith('.css')) {
            Mrep(200,['Community/board/View/View.css'],'text/css');
            break
          } else if (req.url.includes('/Community/board/View/title=')) {
            const requestTitle = decodeURI(req.url.split('title=')[1]);
            DB.query(`select * from boardlist where title='${requestTitle}'`,(err,result)=>{
              Mrep(200,[JSON.stringify(result)],'text/json');
            });
            break
          } else {
            Mrep(200,['/Community/board/View/View.html'],'text/html');
            break
          }
          // else {
            // const requestTitle = decodeURI(req.url.split('/')[4]);
            // DB.query(`select * from boardlist where title='${requestTitle}'`,(err,result)=>{
              // Mrep(200,[JSON.stringify(result)],'text/json');
            // });
            // break
          // }
        // * ==========================================


        // ! 자동 응답 처리 ============================
        default : 
        try {
          console.log(`응답 작성 안한 페이지 자동 응답 : ${req.url}`)
          Mrep(200,[req.url])
          break
          } catch (e) {
            console.log(`없는 페이지 요청 : ${req.url}`);
            Mrep(404,['<h1>요청하신 페이지는 없는 페이지 입니다. (404 Not found)</h1>'],'text/html');
            break
          }
          // ! =========================================
        }
        //* Switch 끝-(GET)
    } else if (req.method === 'POST') {
      //? Switch 시작-(POST)
      switch (true) {
        // * 회원가입 요청 ==============================
        case req.url.includes('/createAccountRequest') :
          let data = '';
          req.on('data',chunk=>{data += chunk});
          req.on('end', ()=>{
            const parsed_data  = qs.parse(data);
            let hashed_pw      = bcrypt.hashSync(parsed_data.PW,12);
            let column         = Object.keys(parsed_data).join();
            let values         = [parsed_data.ID,hashed_pw].map(element=>`\'${element}\'`).join();
            const checkAccount = () => {
              DB.query(`select ID from user_info where ID='${parsed_data.ID}'`,(err,result)=>{
                if (err) {console.log('조회 실패'); throw err;}
                if (result.length > 0) {
                  // DB.end(()=>{console.log('중복된 ID 조회로 인한 DB 접속 종료')})
                  return Mrep(200,[`<script>alert('중복된 ID입니다.'); history.go(-1)</script>`],'text/html');
                } else {
                  DB.query(`insert into user_info (${column}) values (${values})`,(err,result)=>{
                    if (err) {console.log('삽입 실패'); throw err;};
                    if (result) {console.log(`회원가입 성공 : ${parsed_data.ID}`)};
                    // DB.end(()=>{'회원가입 성공으로 DB접속 종료'});
                    return Mrep(200,[`<script>alert('회원가입에 성공하였습니다~ 환영합니다!'); location.href='/CreateAccount/SuccessCreate/successCreate.html'</script>`],'text/html');
                  })
                }
              })
            }
            checkAccount();
          })
          break
        //* ==============================================


        //* 게시판 입장 -> 데이터 건내주기 ==================
        case req.url.includes('/Community/board/GetList') :
          DB.query(`select title,writed,created from boardlist`,((err,result)=>{
            if (err) {console.log('게시판 리스트 가져오는 단계에서 에러 발생'); console.error(err);};
            try {
              Mrep(200,[JSON.stringify(result,null,2)],'text/json');
            } catch (e) {
              console.error('게시판 리스트 데이터 건내주는 단계에서 에러 : ',e);
            }
          }))
          break
        //* ===============================================


        //* 로그인 요청 ====================================
        case req.url.includes('logIn/logInRequest') :
          let UserData='';
          req.on('data',chunk=>{
            UserData += chunk;
          })
          req.on('end',()=>{
            const _UserData = qs.parse(UserData);
            const sql = `select ID,PW from user_info where ID='${_UserData.ID}'`
            DB.query(sql, (err,data)=>{
              if (err) console.log(err);
              console.log(data);
            })
          })
        //* ===============================================
      }
      //? Switch 끝-(POST)
    }
  } catch (e) {
    console.log(`네트워크 요청 오류  url : ${req.url}`);
    console.error(e);
    Mrep(500,['네트워크 요청 오류'],'text/plain')
  }
})

// ? ===================================