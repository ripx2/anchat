import { Card } from '../Card'
import { JoinChatForm } from '../JoinChatForm'
import styles from './JoinChatPage.module.css'

export function JoinChatPage() {
  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <JoinChatForm />
      </Card>
    </div>
  )
}
