import '@fontsource/plus-jakarta-sans' // Defaults to weight 400
import './App.css'
import { ChatPage } from './components/ChatPage'
import { JoinChatPage } from './components/JoinChatPage'
import { HomePage } from "./components/HomePage";
import { io } from "socket.io-client";
import { useState } from 'react';

const socket = io("ws://localhost:5173", { autoConnect: false });


function App() {
  var roomId: string ="";

  /*Para HomePage*/
  const [roomIdCreate, setRoomIdCreate] = useState(false);/*Cuando se pulse el boton desde HomePage, pasa a verdadero*/
  
  /*Para cargar ChatPage */
  const [nickname, setNickname] = useState("");/*Cuando se crea el nombre dl usuario */

  if (!roomIdCreate) {
    return <HomePage createRoomChat={setRoomIdCreate} />
  }

  if (roomIdCreate) {
    socket.connect();
    console.log(`Desde la app cuando se crea el id de la room ${nickname}`)
    return <JoinChatPage userNickname={setNickname} />
  }

  if(socket.connected && nickname != "" && roomId != ""){
    return <ChatPage />
  }

  /********CONEXION AL SOCKET NO ESTOY SEGURO SI SE COLOCA EN LA FUNCION DE LA APP*********/
  socket.on("connect", () => {

    socket.on("RoomIdCreate", (message) => {/*Desde el servidor se manda el id de la room creada*/
      console.log(`Se ha creado el chat con codigo ${message.room}`)
      roomId = message.room;
    });

    if(roomIdCreate){/*Si se pulso el boton para crear chat, manda el evento "RoomIdCreate" para crear la room del chat con su id*/
      socket.emit("RoomIdCreate", { room: "" });
    }
  
  });

}

export default App
