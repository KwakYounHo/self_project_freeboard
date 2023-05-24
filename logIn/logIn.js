import tagMaker  from '/src/modules/tagMaker.js';
import getCookie from '/src/modules/cookieRequest.js';

(async ()=>{
  const cookie = await getCookie;
  if (cookie.uid) {
    alert('이미 로그인 되어 있습니다.');
    location.href="/Main.html"
  } else {
    const root     = tagMaker('div',document.body,{
      'id':'root'
    });
    const form     = tagMaker('form',root,{
      'action':'/logIn/logInRequest','method':'POST'
    });
    const id       = tagMaker('input',form,{
      'type'        : 'text',
      'name'        : 'ID',
      'placeholder' : '아이디를 입력해 주세요.'
    });
    const pw       = tagMaker('input',form,{
      'type'        : 'password',
      'name'        : 'PW',
      'placeholder' : '비밀번호 입력'
    });
    const referrer = tagMaker('input',form,{
      'type'        : 'hidden',
      'name'        : 'referrer',
    });
    referrer.value = document.referrer;
    const submit   = tagMaker('input',form,{
      'type'        : 'submit',
      'value'       : '로그인'
    })
  }
})();
