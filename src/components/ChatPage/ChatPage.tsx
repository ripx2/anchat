import { FiSend } from 'react-icons/fi'
import { FaShareAlt } from "react-icons/fa";
import styles from './ChatPage.module.css'
import { MessageChatReceived } from '../MessageChatReceived'
import { MessageChatSend } from '../MessageChatSend'
import { Socket } from 'socket.io-client'
import { useEffect, useState } from 'react' 

interface ChatPageProps {
  roomId: string
  nickname: string
  socket: Socket
  onNotificationText: (notificationText: string) => void
}

type chatMessage = {
  message: string
  messageRole: 'received' | 'sent'
  nickname?: string
  nicknameColor?: string
}

export function ChatPage({
  roomId,
  nickname,
  socket,
  onNotificationText,
}: ChatPageProps) {

  const [allChatMessages, setAllChatMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  sessionStorage.setItem("nickname", nickname)


  useEffect(() => {
    if (allChatMessages.length == 0) { /* Se renderizo e inicializo el estado para todos los mensajes en vacio*/
      if (sessionStorage.getItem("allChatMessages")) { /*pregunta si hay algo guardado en sessionStorage */
        const auxMessages = JSON.parse(sessionStorage.getItem("allChatMessages")!)
        setAllChatMessages(auxMessages)
        console.log(`Se refresco la pagina y se recuperaron los siguientes mensajes ${auxMessages}`)
      }
      return
    }
    sessionStorage.setItem("allChatMessages", JSON.stringify(allChatMessages))
    console.log(sessionStorage.getItem("allChatMessages")); /*QUITAAAAAAARRRRRRR */
  }, [allChatMessages])


  useEffect(() => {
    socket.on('Message', (message) => {
      let chatMessage: chatMessage = {
        message: message.message,
        messageRole: 'received',
        nickname: message.sender,
        nicknameColor: message.senderColor,
      }
      setAllChatMessages((prevState) => [...prevState, chatMessage])
    })
    console.log(allChatMessages);
    return () => {
      socket.off('Message')
    }
  }, [socket])

  useEffect(() => {
    socket.on('NotificationRoomJoin', (message) => {
      onNotificationText(`El usuario ${message.nickname} se ha unido al chat`)
    })
    return () => {
      socket.off('NotificationRoomJoin')
    }
  }, [socket])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let chatMessage: chatMessage = {
      message: event.currentTarget['toSend'].value,
      messageRole: 'sent',
      nickname: '',
      nicknameColor: '',
    }
    event.currentTarget['toSend'].value = ''
    setAllChatMessages((prevState) => [...prevState, chatMessage])
    socket.emit('Message', {
      message: chatMessage.message,
      sender: nickname,
      room: roomId,
    })
    /*debugger*/
  }

  const shareableLink = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
    const url = new URL(window.location.href)
    navigator.clipboard.writeText(window.location.href)
    console.log(`roomID obtenido desde el link ${url.searchParams.get('roomId')}`) /*SE DEBE QUITAR */
    onNotificationText('Link guardado con el portapapeles')
  }

  return (
    <div className={styles.root}  >

      <header className={styles.copyLinkContainer}>
        <button disabled={loading} onClick={shareableLink}>
          <FaShareAlt className={styles.iconCopyLink} />
        </button>
      </header>

      <div className={styles.messagesChatContainer}>
        <div>
          {allChatMessages.map((currMess, i) =>
            currMess.messageRole === 'received' ? (
              <MessageChatReceived
                key={i}
                textMessage={currMess.message}
                senderName={currMess.nickname}
                senderNameColor={currMess.nicknameColor}
                className={styles.messageReceived}
              />
            ) : (
              <MessageChatSend
                key={i}
                textMessage={currMess.message}
                className={styles.messageSent}
              />
            ),
          )}
        </div>
      </div>

      <form onSubmit={onSubmit} className={styles.sendMessageContainer}>
        <div>
          <input
            name="toSend"
            type="text"
            placeholder="Send a message "
            required
          />
          <button type="submit">
            <FiSend className={styles.icon} />
          </button>
        </div>
      </form>
    </div>
  )
}
