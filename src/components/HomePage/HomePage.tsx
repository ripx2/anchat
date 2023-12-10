import { useEffect, useState } from 'react';
import styles from './HomePage.module.css'
import { MdOutlineAddBox } from 'react-icons/md'

interface HomePageProps {
  createRoomChat: (result: boolean) => void; /*Para enviar hacia la app (CallBack) */
}

export function HomePage({ createRoomChat }: HomePageProps) {

  const [createRoom, setCreateRoom] = useState(false)
  const handleClickButton = () => {
    setCreateRoom(true);
    console.log("Se activo el crear el room")
  }

  useEffect(() => { createRoomChat(createRoom) }, [createRoom]);

  const iconStyle = {
    color: 'white',
    fontSize: '1.5rem',
    verticalAlign: 'middle',
  }
  return (
    <div className={styles.root}>
      <div className={styles.startElements}>
        <a className={styles.createChatText} href="#">
          Crea un chat para empezar
        </a>
        <button onClick={handleClickButton} className={styles.createChatButton}>
          <MdOutlineAddBox style={iconStyle} />
        </button>
      </div>
    </div>
  )
}
