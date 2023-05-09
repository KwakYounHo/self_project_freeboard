export default function (cookie) {
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
