import server     from './src/controllers/server.js';
import chatServer from './src/controllers/chatServer.js';

server.listen(8080,(err)=>{
  if (err) throw err;
  console.log('App server running...');
})

chatServer(server, err=>{
  if (err) throw err;
  console.log('chat server running...')
});