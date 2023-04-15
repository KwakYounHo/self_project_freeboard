import server from './src/modules/server.js';

server.listen(8080,(err)=>{
  if (err) throw err;
  console.log('App server open...');
})