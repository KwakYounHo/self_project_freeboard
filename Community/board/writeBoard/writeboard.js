import tagMaker from "../../../src/modules/tagMaker.js";

const root      = tagMaker('div',document.body,{'id':'root'});
const form      = tagMaker('form',root,{'id':'form','action':'/Community/board/writeBoard/writeRequest','method':'POST'});
const table     = tagMaker('table',form);
const thead     = tagMaker('thead',table);
const tbody     = tagMaker('tbody',table);
const thead_tr  = tagMaker('tr',thead);
const thead_th  = tagMaker('th',thead_tr,{},'글 작성하기')
const thead_tr2 = tagMaker('tr',thead);
const thead_td  = tagMaker('input',thead_tr2,{'type':'text','name':'title','placeholder':'제 목'});
const tbody_tr  = tagMaker('tr',tbody);
const textarea  = tagMaker('textarea',tbody_tr,{'style':'resize:none;','cols':'100','rows':'20','name':'text','placeholder':'본 문'});

const GobackButton = tagMaker('input',form,{'type':'button','value':'돌아가기'});
const submitBotton = tagMaker('input',form,{'type':'submit','value':'작성하기'});
GobackButton.addEventListener('click',()=>{
  if (confirm('작성하신 내용은 저장되지 않습니다\n작성을 그만두고 돌아가시겠습니까?')) {
    history.go(-1);
  }
})