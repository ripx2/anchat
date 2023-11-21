import styles from './JoinChatForm.module.css'

export interface JoinChatFormSubmitData {
  name: string
}

export interface JoinChatFormProps {
  onSubmit?: (data: JoinChatFormSubmitData) => void
}

export function JoinChatForm(props: JoinChatFormProps) {
  const onSubmit = () => {
    props.onSubmit && props.onSubmit({ name: 'name' })
  }

  return (
    <form onSubmit={onSubmit} className={styles.root}>
      <button className={styles.submitButton}>Guardar</button>
    </form>
  )
}
