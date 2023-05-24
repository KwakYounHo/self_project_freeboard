import tagMaker from './src/modules/tagMaker.js'

const root      = tagMaker('div',document.body,{'id':'root'});
const boardList = tagMaker('a',root,{'href':'/Community/board/List.html'},'게시판');
const SignUp    = tagMaker('a',root,{'href':'/CreateAccount/createAccount.html'},'회원가입');
const logIn     = tagMaker('a',root,{'href':'/login/logIn.html'},'로그인');
const logout    = tagMaker('input',root,{'type':'button', 'value':'로그아웃'});
logout.addEventListener('click', ()=>{
  location.href = '/logout';
})