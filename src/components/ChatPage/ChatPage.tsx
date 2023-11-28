import { FiSend } from "react-icons/fi";
import styles from './ChatPage.module.css'


export function ChatPage() {

  return (
    <div className={styles.root}>


      <div className={styles.sendMessageElements}>
        <input type="text" className={styles.messageAreaInput} placeholder="Send a message " required />
        <button className={styles.sendMessageButton}><FiSend className={styles.icon} /></button>
      </div>

    </div>
  )
}
