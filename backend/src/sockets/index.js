var sockets = {};
sockets.init = function(server) {
  sockets.io = require("socket.io").listen(server);
  sockets.io.set('origins', '*:*');

  sockets.io.on("connection", socket => {
    socket.on("SET_USERID", data => {
      socket.userId = data.userId;
    });

    socket.on("SEND_NEW_MESSAGE", data => {
      if (data.from == socket.userId) {
      }
      for (let key in sockets.io.sockets.sockets) {
        if (sockets.io.sockets.sockets.hasOwnProperty(key)) {
          if (data.to == sockets.io.sockets.sockets[key].userId) {
            sockets.io.sockets.sockets[key].emit("RECEIVE_NEW_MESSAGE", {
      
            });
          }
        }
      }
    });
  });
};

module.exports = {
  sockets
};
