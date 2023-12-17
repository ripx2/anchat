import '@fontsource/plus-jakarta-sans' // Defaults to weight 400
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import './App.css'
import { ChatPage } from './components/ChatPage'
import { HomePage } from './components/HomePage'
import { JoinChatPage } from './components/JoinChatPage'
import { NotificationMessage } from './components/NotificationMessage'

function App() {
  const [roomId, setRoomId] = useState<string | undefined>()
  const [socket, setSocket] = useState<Socket | undefined>()
  const [notificationText, setNotificationText] = useState<string | undefined>()
  const [showNotifications, SetShowNotifications] = useState<boolean | undefined>(undefined)
  const [nickname, setNickname] = useState('')
  const [joinedOrCreatedRoom, setJoinedOrCreatedRoom] = useState('')

  useEffect(() => {
    if (!(showNotifications === undefined) || !(notificationText === undefined)) {
      if (!(notificationText === '')) {
        SetShowNotifications(true);
        setTimeout(() => {
          SetShowNotifications(false);
          setNotificationText('');
        }, 4000);
      }
    }
  }, [notificationText])

  return (
    <>
      {showNotifications && notificationText && (
        <div className="notificationContainer">
          <NotificationMessage
            message={notificationText}
            className="notificationBox"
          />
        </div>
      )}

      {socket && roomId && nickname && (
        <ChatPage
          roomId={roomId}
          nickname={nickname}
          socket={socket}
          onNotificationText={(notificationText) => setNotificationText(notificationText)}
        />
      )}
      {socket && roomId && !nickname && (
        <JoinChatPage
          onSetNickname={setNickname}
          onSetNotificationText={setNotificationText}
          socket={socket}
          roomId={roomId}
          joinedOrCreatedRoom ={joinedOrCreatedRoom}
        />
      )}
      {!roomId && (
        <HomePage
          onSuccessConnection={(roomId, socket, notificationText, joinedOrCreatedRoom) => {
            setRoomId(roomId)
            setSocket(socket)
            setNotificationText(notificationText)
            setJoinedOrCreatedRoom(joinedOrCreatedRoom)
          }}
        />
      )}
    </>
  )
}

export default App
