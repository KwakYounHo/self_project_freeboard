import tagMaker from '/src/modules/tagMaker.js'

const root = tagMaker('div',document.body,{
  'id':'root'
});
const form = tagMaker('form',root,{
  'action':'/logIn/logInRequest','method':'POST'
});
const id   = tagMaker('input',form,{
  'type'        : 'text',
  'name'        : 'ID',
  'placeholder' : '아이디를 입력해 주세요.'
});
const pw   = tagMaker('input',form,{
  'tpye'        : 'password',
  'name'        : 'PW',
  'placeholder' : '비밀번호 입력'
})