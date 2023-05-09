export default (async ()=>{
  const request = await fetch('/getCookie');
  return request.json();
})();