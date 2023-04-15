export default function (tagName,target,Attribute,innerText) {
  const element = document.createElement(tagName);
  if (Attribute) {
    if (typeof(Attribute) === 'object') {
      for (let p in Attribute) {
        element.setAttribute(p,Attribute[p]);
      }
    } else {
      const NoObject = new Error('속성 매개변수는 객체 형식이어야 합니다.')
      console.error(NoObject);
    }
  }
  if (innerText) {
    if (innerText && typeof(innerText) === 'string') {
      element.innerText = innerText;
    } else {
      const NoString = new Error('innerText 매개변수는 문자열 형식이어야 합니다.')
      console.error(NoString);
    }
  }
  target.appendChild(element);
  return element
}