import tagMaker from './src/modules/tagMaker.js'

const root    = tagMaker('div',document.body,{'id':'root'});
const Goboard = tagMaker('a',root,{'href':'/Community/board.html'},'게시판');