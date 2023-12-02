import styles from './MessageChatReceived.module.css'

export interface MessageChatReceivedProps {
  textMessage: string
  senderName: string
  senderNameColor: string
  className?: string
}

export function MessageChatReceived(props: MessageChatReceivedProps) {
  return (
    <div className={styles.root + ' ' + props.className}>
      <p style={{ color: props.senderNameColor }}>{props.senderName}</p>
      <p>{props.textMessage}</p>
    </div>
  )
}
