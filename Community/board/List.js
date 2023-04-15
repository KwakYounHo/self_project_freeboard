import tagMaker from "../../src/modules/tagMaker.js";

const root   = tagMaker('div',document.body,{'id':'root'})
const table  = tagMaker('table',root);
const tHead  = tagMaker('thead',table);
const tbody  = tagMaker('tbody',table);
const column = tagMaker('tr',tHead);

// ? 열(column) 내용
tagMaker('th',column,{},'번호');
tagMaker('th',column,{},'제목');
tagMaker('th',column,{},'글쓴이');
tagMaker('th',column,{},'생성 날짜');

// ? 페이지 버튼


// ? 홈으로
const goHome = tagMaker('input',root,{
  'type'    : 'button',
  'value'   : '홈으로'
});
goHome.addEventListener('click',GoHome);
function GoHome () {
  location.href='/Main.html';
}