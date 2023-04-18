import tagMaker from "../../../src/modules/tagMaker.js";

const root       = tagMaker('div',document.body,{'id':'root'});
const table      = tagMaker('table',root);
const thead      = tagMaker('thead',table);
const tbody      = tagMaker('tbody',table);


const RequestTitle     = document.location.href.split('/')[6];
const boardTextRequest = new XMLHttpRequest;

boardTextRequest.open('GET','title='+RequestTitle);
boardTextRequest.send();
boardTextRequest.addEventListener('load',()=>{
  const parsedData       = JSON.parse(boardTextRequest.response)
  console.log(parsedData);
  const column_first_tr  = tagMaker('tr',thead);
  const title            = tagMaker('th',column_first_tr,{'colspan':'4'});
  title.innerText        = boardTextRequest.response.title;
  const column_second_tr = tagMaker('tr',thead);
  const writed           = tagMaker('th',column_second_tr,{},'글쓴이');
  const writed_value     = tagMaker('td',column_second_tr,boardTextRequest.response.writed);
  const created          = tagMaker('th',column_second_tr,{},'작성자');
  const created_value    = tagMaker('td',column_second_tr,boardTextRequest.response.created);
  const textColumn       = tagMaker('tr',tbody);
  const textValue        = tagMaker('td',textColumn,{},boardTextRequest.response.text);
})