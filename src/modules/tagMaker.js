export default function (tagName,target,Attribute,innerText) {
  const element = document.createElement(tagName);
  if (typeof(Attribute) === 'object') {
    for (p in Attribute) {
      element.setAttribute(p,Attribute[p]);
    }
  } else {
    const NoObject = new Error('속성 매개변수는 객체 형식이어야 합니다.')
    console.error(NoObject);
  }
  if (typeof(innerText) === 'string') {
    element.innerText = innerText;
  } else {
    const NoString = new Error('innerText 매개변수는 문자열 형식이어야 합니다.')
    console.error(NoString);
  }
  target.appendChild(element);
  return element
}