//Node server whic will handl socket io connection
const io = require('socket.io')(5500, {
      cors: {
        origin: '*',
      }
    });

const users = {};

io.on('connection',socket =>{
       socket.on('new-user-joined',Name=>{
             console.log("New user",Name);
             users[socket.id] = Name;
             socket.broadcast.emit('user-joined',Name);
       })
       
       socket.on('send',message=>{
            socket.broadcast.emit('recieve',{message: message, name: users[socket.id]});
       })
       socket.on("disconnect", message => {
           socket.broadcast.emit('left',users[socket.id]);
           delete users[socket.id];
          });
})