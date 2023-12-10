import { useEffect, useState } from 'react'
import { Card } from '../Card'
import { JoinChatForm } from '../JoinChatForm'
import styles from './JoinChatPage.module.css'

interface JoinChatPageProps{
  userNickname: (userName: string) => void
}

export function JoinChatPage({userNickname}:JoinChatPageProps) {

  const [userName, setUserName] = useState("");

  useEffect(() => { userNickname(userName) }, [userName]);

  return (
    <div className={styles.root}>
      <Card className={styles.card}>
        <JoinChatForm UserName={setUserName} />
      </Card>
    </div>
  )
}
