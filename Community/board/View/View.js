import tagMaker from "../../../src/modules/tagMaker.js";

const root = tagMaker('div',document.body,{'id':'root'});

const RequestTitle     = document.location.href.split('/')[6];
const boardTextRequest = new XMLHttpRequest;

boardTextRequest.open('POST','?'+document.location.href);
boardTextRequest.send();