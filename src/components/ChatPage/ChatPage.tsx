import { FiSend } from 'react-icons/fi'
import { BsClipboardPlus } from 'react-icons/bs'
import styles from './ChatPage.module.css'
import { NotificationMessage } from '../NotificationMessage'
import { MessageChatReceived } from '../MessageChatReceived'
import { MessageChatSend } from '../MessageChatSend'

export function ChatPage() {
  const messageLinkCopied = 'Link guardado con el portapapeles'
  const messageUsedAddedChat = 'Usuario Ricardo Bermudez Ingresado'

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
      <div className={styles.notificationContainer}>
        <NotificationMessage
          message={messageLinkCopied}
          className={styles.notificationBox}
        />
      </div>

      <div className={styles.copyLinkSection}>
        <button className={styles.copyLinkButton}>
          <BsClipboardPlus className={styles.iconCopyLink} />
        </button>
        <a className={styles.copyLinkText} href="#">
          Copiar Link para el chat
        </a>
      </div>

      <div className={styles.messagesChatContainer}>
        <div>
          <MessageChatSend
            textMessage="CARE MODAAAAA"
            className={styles.messageSent}
          />
          <MessageChatReceived
            textMessage={textMessage}
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatSend
            textMessage={teMeSend}
            className={styles.messageSent}
          />
          <MessageChatReceived
            textMessage="Mensage abcdefge hijk lmnope rstu vw xyz 12345 chat 2"
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatReceived
            textMessage="Mensage 3"
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatReceived
            textMessage="Mensage abcdefge hijk lmnope rstu vw xyz 12345 chat chat 4"
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatSend
            textMessage="Ojo ahi"
            className={styles.messageSent}
          />
          <MessageChatReceived
            textMessage="Mensage abcdefge hijk lmnope rstu vw xyz 12345 chat chat 5"
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatSend
            textMessage="TE AMOO!!!"
            className={styles.messageSent}
          />
          <MessageChatReceived
            textMessage="Mensage abcdefge hijk lmnope rstu vw xyz 12345 chat chat 6"
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatReceived
            textMessage="Mensage chat 7"
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatReceived
            textMessage={textMessage}
            senderName={senderName}
            senderNameColor={senderNameColor}
            className={styles.messageReceived}
          />
          <MessageChatSend
            textMessage={teMeSend}
            className={styles.messageSent}
          />
        </div>
      </div>

      <div className={styles.sendMessageContainer}>
        <div>
          <input type="text" placeholder="Send a message " required />
          <button>
            <FiSend className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  )
}
