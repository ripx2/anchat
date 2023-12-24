import { Socket } from 'socket.io-client'
import { Card } from '../Card'
import { JoinChatForm } from '../JoinChatForm'
import styles from './JoinChatPage.module.css'


interface JoinChatPageProps {
  onSetNickname: (userName: string) => void
  onSetNotificationText: (notificationText: string) => void
  socket: Socket
  roomId: string
  joinedOrCreatedRoom: string
}

export function JoinChatPage({ onSetNickname, onSetNotificationText, socket, roomId, joinedOrCreatedRoom }: JoinChatPageProps) {
  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <JoinChatForm
          onSetNickname={onSetNickname}
          onSetNotificationText={onSetNotificationText}
          socket={socket}
          roomId={roomId}
          joinedOrCreatedRoom={joinedOrCreatedRoom}
        />
      </Card>
    </div>
  )
}
