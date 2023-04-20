import tagMaker from "/src/modules/tagMaker.js";

const root = tagMaker('div',document.body,{'id':'root'});
const form = tagMaker('form',root,{
  'id' : 'form',
  'method':'POST',
  'action':'/createAccountRequest'
});
const input_id      = tagMaker('input',form,{
  'type'        : 'text',
  'name'        : 'ID',
  'placeholder' : '생성할 ID'
});
const input_pw      = tagMaker('input',form,{
  'type'        : 'password',
  'name'        : 'PW',
  'placeholder' : '비밀번호 입력'
});
const button_submit = tagMaker('input',form,{
  'type'        : 'submit',
  'value'       : '회원가입'
});
const goHome = tagMaker('input',root,{
  'type'  : 'button',
  'value' : '홈으로'
})
goHome.addEventListener('click',()=>{location.href='/Main.html'});