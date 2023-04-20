import tagMaker from "/src/modules/tagMaker.js";

const root       = tagMaker('div',document.body,{'id':'root'});
const table      = tagMaker('table',root);
const thead      = tagMaker('thead',table);
const tbody      = tagMaker('tbody',table);


const RequestTitle     = document.location.href.split('/')[6];
const boardTextRequest = new XMLHttpRequest;

boardTextRequest.open('GET','title='+RequestTitle);
boardTextRequest.send();
boardTextRequest.addEventListener('load',()=>{
  const parsedData       = JSON.parse(boardTextRequest.response)[0]
  const column_first_tr  = tagMaker('tr',thead);
  const title            = tagMaker('th',column_first_tr,{'colspan':'4'},parsedData.title);
  const column_second_tr = tagMaker('tr',thead);
  const writed           = tagMaker('th',column_second_tr,{},'글쓴이');
  const writed_value     = tagMaker('td',column_second_tr,{},parsedData.writed);
  const created          = tagMaker('th',column_second_tr,{},'생성일');
  const created_value    = tagMaker('td',column_second_tr,{},parsedData.created.split('T')[0]);
  const textColumn       = tagMaker('tr',tbody);
  const textBox_td       = tagMaker('td',textColumn,{'colspan':'4'});
  const textbox          = tagMaker('div',textBox_td,{'id':'textBox'},`<p>${parsedData.text}</p>`);;
  const table_footer     = tagMaker('tr',tbody);
  const updated_th       = tagMaker('th',table_footer,{},'수정일');
  const updated          = tagMaker('div',table_footer,{},parsedData.updated.split('T')[0]);
})

const buttonWrap       = tagMaker('div',root);
const boardListButton  = tagMaker('input',buttonWrap,{'type':'button','value':'목록'});
const homeButton       = tagMaker('input',buttonWrap,{'type':'button','value':'홈으로'});
const writeButton      = tagMaker('input',buttonWrap,{'type':'button','value':'글 작성하기'});
homeButton.addEventListener('click',()=>{
  location.href = '/Main.html'
})
boardListButton.addEventListener('click',()=>{
  location.href = '/Community/board/List.html'
})
writeButton.addEventListener('click',()=>{
  location.href = '/Community/board/writeBoard/writeBoard.html'
})