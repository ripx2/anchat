import { FiSend } from 'react-icons/fi'
import { BsClipboardPlus } from 'react-icons/bs'
import styles from './ChatPage.module.css'
import { MessageChatReceived } from '../MessageChatReceived'
import { MessageChatSend } from '../MessageChatSend'
import { Socket } from 'socket.io-client'
import { useEffect, useState } from 'react'

interface ChatPageProps {
  roomId: string,
  nickname: string,
  socket: Socket,
  onNotificationText: (
    notificationText: string,
  ) => void
}

type chatMessage = {
  message: string,
  messageRole: "received" | "sent",
  nickname?: string,
  nicknameColor?: string
}


export function ChatPage({ roomId, nickname, socket, onNotificationText }: ChatPageProps) {

  const [allchatMessages, setAllChatMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("Message", (message) => {
      console.log(message)
      let chatMessage: chatMessage = {
        message: message.message,
        messageRole: "received",
        nickname: message.sender,
        nicknameColor: message.senderColor,
      };
      setAllChatMessages(prevState => [...prevState, chatMessage]);
    });

    return () => {
      socket.off("Message");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("NotificationRoomJoin", (message) => {
      onNotificationText(`El usuario ${message.nickname} se ha unido al chat`);
    });
    return () => {
      socket.off("NotificationRoomJoin");
    };
  }, [socket])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let chatMessage: chatMessage = {
      message: event.currentTarget["toSend"].value,
      messageRole: "sent",
      nickname: '',
      nicknameColor: ''
    };
    event.currentTarget["toSend"].value = '';
    setAllChatMessages(prevState => [...prevState, chatMessage]);
    socket.emit("Message", { message: chatMessage.message, sender: nickname, room: roomId });
    /*debugger*/
  }

  const shareableLink = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    const url = new URL(window.location.href);
    navigator.clipboard.writeText(window.location.href)
    console.log(`roomID obtenido desde el link ${url.searchParams.get("roomId")}`); /*SE DEBE QUITAR */
    onNotificationText('Link guardado con el portapapeles');
  }



  const messageLinkCopied = 'Link guardado con el portapapeles'
  const messageUserdAddedChat = 'Usuario Ricardo Bermudez Ingresado'

  /* PRUEBA PARA MENSAJE RECIBIDO EN EL CHAT*/
  const textMessage: string =
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  const senderName: string = 'Abigail Bermudez'
  const senderNameColor: string = 'rgba(181, 48, 167, 1)'

  /* PRUEBA PARA MENSAJE ENVIADO EN EL CHAT*/
  const teMeSend: string =
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  return (
    <div className={styles.root}>

      <div className={styles.copyLinkContainer}>
        <button disabled={loading} onClick={shareableLink}>
          <BsClipboardPlus className={styles.iconCopyLink} />
        </button>
        <a href="#">
          Copiar Link para el chat
        </a>
      </div>

      <div className={styles.messagesChatContainer}>
        <div>
          {allchatMessages.map((currMess, i) => (
            currMess.messageRole === "received" ? <MessageChatReceived textMessage={currMess.message}
              senderName={currMess.nickname} senderNameColor={currMess.nicknameColor} className={styles.messageReceived} />
              : <MessageChatSend textMessage={currMess.message} className={styles.messageSent} />
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className={styles.sendMessageContainer}>
        <div>
          <input name="toSend" type="text" placeholder="Send a message " required />
          <button type="submit">
            <FiSend className={styles.icon} />
          </button>
        </div>
      </form>
    </div>
  )
}
