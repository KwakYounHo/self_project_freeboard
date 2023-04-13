const DB = require("./modules/DBconfig.js");
const http = require("http");
const fs = require("fs");
const path = require("path");

DB.connect((err) => {
  if (err) throw err;
  console.log("DB connected...");
});
module.exports = http.createServer((req, rep) => {
  //! 응답 함수
  const repFunction = (stateCode, type, write, end = "") => {
    rep.writeHead(stateCode, { "Content-Type": `${type}; charset=utf-8` });
    if (write && Array.isArray(write)) {
      write.forEach((element) => {
        if (element.includes(".html")) {
          rep.write(fs.readFileSync(`./HTML/${element}`, "utf-8"));
        } else {
          rep.write(element);
        }
      });
    }
    rep.end(end);
  };

  //! 서버 로직
  try {
    if (req.method === "GET") {
      switch (true) {
        case req.url === "/" ||
          req.url === "/index.html" ||
          req.url === "/HTML/index.html":
          console.log(__dirname);
          return repFunction(200, "text/html", ["index.html"]);
        case req.url.includes("secondPage.html"):
          return repFunction(200, "text/html", ["secondPage.html"]);
        case req.url.includes("findthis.html"):
          return repFunction(200, "text/html", [req.url]);
        default:
          try {
            if (req.url.includes(".env")) {
              repFunction(500, "text/plain", ["그 곳에는 접근할 수 없습니다."]);
              console.log(
                "해킹시도! - env파일로 접근한 User IP : ",
                req.connection.remoteAddress
              );
            } else {
              rep.end(
                fs.readFileSync(path.join(__dirname, "../", req.url), "utf-8")
              );
              console.log(__dirname);
              console.error("등록하지 않았지만 자동응답 한 요청 : ", req.url);
            }
          } catch (e) {
            repFunction(404, "text/html", ["<h1>없는 페이지 입니다.</h1>"]);
            console.error("없는 페이지 요청 : ", req.url);
          }
      }
    }
  } catch (e) {
    rep.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    rep.end("서버 연결에 실패하였습니다.");
    console.error("서버 에러 : ", e);
  }
});
