import { createServer } from "http"
import { Server } from "socket.io";

const short = require('short-uuid');

let roomsIdsAvailables = [];
var temporaryId: string;

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

type forColor = {
  nicknameColorsAssigned: string[],
  volatileNicknameColor: string,
}

const settingColor = (nicknameColorsAssigned: string[], colorArray: string[]): forColor => {
  let volatileNicknameColor = colorArray[Math.floor(Math.random() * 50)];
  if (nicknameColorsAssigned.includes(volatileNicknameColor)) {
    volatileNicknameColor = colorArray[Math.floor(Math.random() * 50)];
    while (true) {
      if (nicknameColorsAssigned.includes(volatileNicknameColor)) {
        continue;
      }
      else {
        break;
      }
    }
  }
  nicknameColorsAssigned.length == 0 ? nicknameColorsAssigned[0] = volatileNicknameColor : nicknameColorsAssigned.push(volatileNicknameColor);
  return {
    nicknameColorsAssigned: nicknameColorsAssigned,
    volatileNicknameColor: volatileNicknameColor
  };
};

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});



let roomsIdsMap = new Map<string, Map<string, {senderColor:string, isConnected:boolean}>>();/*Cada roomId es una key, en la que se almacenan los paticipantes del room (ninkname)  y el color para cada un*/



io.on("connection", (socket) => {

  socket.on("RoomIdJoin", (message) => {
    socket.join(message.room);
    socket.emit("RoomIdJoin", { message: "Te haz unido al Chat. Registra tu nombre para continuar" })
  })

  socket.on("NotificationRoomJoin", (message) => {
    var settedColor: forColor = { nicknameColorsAssigned: [], volatileNicknameColor: '' };
    settedColor = settingColor(settedColor.nicknameColorsAssigned, colorArray);

    if (roomsIdsMap.has(message.room)){
      let chatMemberMap = roomsIdsMap.get(message.room)
      roomsIdsMap.set(message.room, chatMemberMap.set(message.nickname, {senderColor:settedColor.volatileNicknameColor, isConnected:true}));
    }
    else{
      let chatMemberMap = new Map<string, {senderColor:string, isConnected:boolean}>();
      roomsIdsMap.set(message.room, chatMemberMap.set(message.nickname, {senderColor:settedColor.volatileNicknameColor, isConnected:true}));
    }
    
    console.log(roomsIdsMap)
    socket.emit("NotificationRoomJoinOk", { message: "Bienvenido al chat" })/*Para el que se acaba de unir */
    socket.to(message.room).emit("NotificationRoomJoin", { nickname: message.nickname }); /*Para los que ya estan -- se escucha en ChatPage */
    console.log(`Cliente ${message.nickname} unido al grupo: ${message.room.toString().trim()}`); /*QUITARLOOOOO */
  })

  socket.on("RoomIdCreate", (message) => {
    temporaryId = short.generate();
    socket.join(temporaryId);
    socket.emit("RoomIdCreate", { message: "Se ha creado la sala, registra tu nombre para continuar", room: temporaryId });
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
      let listChatMembers = roomsIdsMap.get(message.room);
      let nickname = listChatMembers.get(message.sender);
      let nicknameColor = nickname.senderColor;
      socket.to(message.room).emit("Message", { message: message.message, room: message.room, sender: message.sender, senderColor: nicknameColor });
      console.log(message);
    }
  });
});

io.listen(3000);
console.log("Server Running");
