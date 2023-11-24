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

      <div className={styles.paragraphInfoSection}>
        <h2>Tienes nombre?</h2>
        <p className={styles.infP1}>Ingresa un nombre para poder iniciar <br />la conversación</p>
        
      </div>

      <div className={styles.inputsSection}>
        <input type="text" maxLength={40} minLength = {4} className={styles.userNameInput} placeholder=" " required/>
        <button className={styles.submitButton}>Guardar</button>
        <div className={styles.requirements}>Debe tener al menos cuatro caracteres</div>
      </div>

      <div className={styles.randomName}>
        <a>Generar nombre random</a>
      </div>
      
    </form>
  )
}
