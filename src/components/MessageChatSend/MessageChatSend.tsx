import styles from './MessageChatSend.module.css'

export interface MessageChatSendProps {
  textMessage: string
  className?: string
}

export function MessageChatSend(props: MessageChatSendProps) {
  return (
    <div className={styles.root + ' ' + props.className}>
      <p>{props.textMessage}</p>
    </div>
  )
}
