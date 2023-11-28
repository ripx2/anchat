import { FiSend } from "react-icons/fi";
import styles from './ChatPage.module.css'
import { NotificationMessage } from '../NotificationMessage'

export function ChatPage() {
  const messageLinkCopied = 'Link guardado con el portapapeles';
  const messageUsedAddedChat = 'Usuario Ricardo Bermudez Ingresado';

  return (
    <div className={styles.root}>
      <div className={styles.copyLinkSection}>
        <button className={styles.copyLinkButton}><FiSend className={styles.iconCopyLink} /></button>
        <a className={styles.copyLinkText} href="#">Copiar Link para el chat</a>
      </div>
      <div className={styles.notificationContainer}>
        <NotificationMessage message={messageLinkCopied} className={styles.notificationBox} />
        <NotificationMessage message={messageUsedAddedChat} className={styles.notificationBox} />
      </div>

      <div className={styles.messagesChatArea}>

      </div>


      <div className={styles.sendMessageElements}>
        <input type="text" className={styles.messageAreaInput} placeholder="Send a message " required />
        <button className={styles.sendMessageButton}><FiSend className={styles.icon} /></button>
      </div>

    </div>
  )
}
