import { MdOutlineAddBox } from 'react-icons/md'
import { Socket, io } from 'socket.io-client'
import styles from './HomePage.module.css'
import { useEffect, useMemo, useState } from 'react'


interface HomePageProps {
  onSuccessConnection: (
    roomId: string,
    socket: Socket,
    notificationText: string,
    joinedOrCreatedRoom: string,
  ) => void
}

export function HomePage({ onSuccessConnection }: HomePageProps) {

  /*QUITAR ESTO DE AQUI */
  const iconStyle = {
    color: 'white',
    fontSize: '1.5rem',
    verticalAlign: 'middle',
  }

  const [loading, setLoading] = useState(false);

  const urlRoomId = useMemo(() => {
    /* Se ejecuta una sola vez al renderizar el componente, 
    pregunta si la url tiene el roomId (esto quiere decir que
    se va unir a un chat existente), retornandolo en urlRoomId, 
    sino esta el roomId en la url (esto quiere decir que se va 
    a crear un nuevo chat), retorna undefined en urlRoomId */
    const url = new URL(window.location.href);
    const roomIdfromUrl = url.searchParams.get("roomId");
    return roomIdfromUrl ? roomIdfromUrl : undefined;
  }, []);

  useEffect(() => {
    /*Cuando cambia urlRoomId del useMemo, se dispara este useEfect,
     si hay un roomId en la url (viene en urlRoomId), ejecuta o llama
     a la funcion connectToServer(), sino hay un roomId en la url, 
     urlRoomId viene con un undefined, lo que quiere decir que se va 
     a crear un nuevo chat*/
    if (urlRoomId)
      connectToServer();
  }, [urlRoomId]);

  const notifyConnection = (roomId: string, socket: Socket, notificationText: string, joinedOrCreatedRoom: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('roomId', roomId)
    history.pushState({}, '', url)
    onSuccessConnection(roomId, socket, notificationText, joinedOrCreatedRoom)
  }

  const connectToServer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    const socket = io(import.meta.env.VITE_SOCKET_URL, { autoConnect: false });
    socket.connect();
    socket.on('connect', () => {
      let notificationText: string;
      let joinedOrCreatedRoom: string;
      if (urlRoomId) { /*Si se unio a un room */
        socket.emit("RoomIdJoin", { room: urlRoomId, nickname: null });
        socket.on("RoomIdJoin", (message) => {
          if (!sessionStorage.getItem("nickname"))
            notificationText = message.message;
          joinedOrCreatedRoom = "joinedToRoom";
          return notifyConnection(urlRoomId, socket, notificationText, joinedOrCreatedRoom);
        });
      }
      else { /*Si se creo el room */
        socket.emit('RoomIdCreate', { room: '' })
        socket.on('RoomIdCreate', (message) => {
          notificationText = message.message;
          joinedOrCreatedRoom = "createdRoom";
          console.log(`Se ha creado el chat con codigo ${message.room}`)
          notifyConnection(message.room, socket, notificationText, joinedOrCreatedRoom);
        })
      }
    })
  }

  return (
    <div className={styles.root}>
      {!urlRoomId && (
        <div className={styles.startElements}>
          <a className={styles.createChatText} href="#">
            Crea un chat para empezar
          </a>
          <button disabled={loading} onClick={connectToServer} className={styles.createChatButton}>
            <MdOutlineAddBox style={iconStyle} />
          </button>
        </div>
      )}
    </div>
  )
}
