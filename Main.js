import tagMaker from './src/modules/tagMaker.js'

const root      = tagMaker('div',document.body,{'id':'root'});
const boardList = tagMaker('a',root,{'href':'/Community/board/List.html'},'게시판');
const SignUp    = tagMaker('a',root,{'href':'/CreateAccount/createAccount.html'},'회원가입');