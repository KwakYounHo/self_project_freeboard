const cookie = 'a=b; c=d; e=f'
function parse(cookie) {
  let result = {};
  const splitOne = cookie.split(';');
  const splitTwo = splitOne.map(element => {
    return element.trim();
  })
  splitTwo.forEach(element => {
    result[element.split('=')[0]] = element.split('=')[1]
  })
  return result;
}

console.log(parse(cookie));