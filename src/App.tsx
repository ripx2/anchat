import '@fontsource/plus-jakarta-sans' // Defaults to weight 400
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import './App.css'
import { ChatPage } from './components/ChatPage'
import { HomePage } from './components/HomePage'
import { JoinChatPage } from './components/JoinChatPage'
import { NotificationMessage } from './components/NotificationMessage'

import { MdWbSunny } from "react-icons/md"
import { FaMoon } from "react-icons/fa";
import WindowFocusHandler from './WindowFocusHandler'

function App() {
  const [roomId, setRoomId] = useState<string | undefined>()
  const [socket, setSocket] = useState<Socket | undefined>()
  const [notificationText, setNotificationText] = useState<string | undefined>()
  const [showNotifications, SetShowNotifications] = useState<boolean | undefined>(undefined)
  const [nickname, setNickname] = useState('')
  const [joinedOrCreatedRoom, setJoinedOrCreatedRoom] = useState('')
  const [darkTheme, setDarkTheme] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(false);/*Deshabilitar 2s boton cambio de tema */

  /*Para las notificaciones externas*/
   const  windowVisibility = WindowFocusHandler();

    /*Para las notificaciones internas*/
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

    /*
    useEffect(() => {
      if (darkTheme === undefined) {
        if (sessionStorage.getItem("lastTheme")) {
          const lastTheme = sessionStorage.getItem("lastTheme")
          lastTheme === "dark" ? setDarkTheme(true) : setDarkTheme(false)
          console.log(`Desde la actualizacion de la pagina ${lastTheme}` )
        }
        return
      }
      darkTheme ? sessionStorage.setItem("lastTheme", "dark") : sessionStorage.setItem("lastTheme", "light")
    }, [darkTheme])*/

    const handleTheme = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      darkTheme ? setDarkTheme(false) : setDarkTheme(true)
    }

    return (
      <main className="appRoot" data-theme={darkTheme ? "dark" : "light"}>
        <header className='mainHeader'>
          <div className="dark_mode">
            <input
              className="dark_mode_input"
              type='checkbox'
              id='darkmode-toggle'
              onChange={handleTheme}
              disabled={loading}
            />
            <label className="dark_mode_label" htmlFor='darkmode-toggle'>
              <MdWbSunny className="sun" />
              <FaMoon className="moon" />

            </label>
          </div>
        </header>


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
            showExternalNotification = {!windowVisibility}
          />
        )}
        {socket && roomId && !nickname && (
          <JoinChatPage
            onSetNickname={setNickname}
            onSetNotificationText={setNotificationText}
            socket={socket}
            roomId={roomId}
            joinedOrCreatedRoom={joinedOrCreatedRoom}
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
      </main>
    )
  }

  export default App
