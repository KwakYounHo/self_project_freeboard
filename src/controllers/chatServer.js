import { Server } from 'socket.io';

export default function(serverAdapter, callback) {
  try {
    const io = new Server(serverAdapter)
    io.on('connection', socket => {
      
    })
    callback();
  } catch (e) {
    callback(e);
  }
}