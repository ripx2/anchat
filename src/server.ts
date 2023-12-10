import { Server } from "socket.io";
const short = require('short-uuid');

let roomsIdsAvailables = [];
var temporaryId: string;


const io = new Server({});

io.on("connection", (socket) => {

  socket.on("RoomIdJoin", (message) => {
    socket.join(message.room);
    console.log(`Cliente unido al grupo: ${message.room.toString().trim()}`);
  })

  socket.on("RoomIdCreate", (message) => {
    temporaryId = short.generate();
    socket.join(temporaryId);
    console.log(`Cliente ha creado el  grupo: ${temporaryId}`);
    socket.emit("RoomIdCreate", { room: temporaryId });
    if (roomsIdsAvailables.length == 0)
      roomsIdsAvailables[0] = temporaryId;
    else
      roomsIdsAvailables.push(temporaryId);
  })

  socket.on("Message", (message) => {
    if (message.message == null) {
      console.log(`Cliente conectado: ${message.sender} al grupo:` + ` ${message.room}`);
    }
    else {
      socket.to(message.room).emit("Message", message);
      console.log(message);
    }
  });
});

io.listen(5173);/*Puerto donde se ejecuta la APP */
console.log("Server Running");
