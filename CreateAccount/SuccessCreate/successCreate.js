import tagMaker from "/src/modules/tagMaker.js";

const root = tagMaker('div',document.body,{'id':'root'});
tagMaker('h1',root,{},'축하합니다~ 회원가입에 성공하셨습니다~');
tagMaker('a',root,{'href':'/Main.html'},'메인 페이지로');