export default function (tagName,target,Attribute,innerHTML) {
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
  if (innerHTML) {
    if (innerHTML && typeof(innerHTML) === 'string') {
      element.innerHTML = innerHTML;
    } else {
      const NoString = new Error('innerHTML 매개변수는 문자열 형식이어야 합니다.')
      console.error(NoString);
    }
  }
  target.appendChild(element);
  return element
}