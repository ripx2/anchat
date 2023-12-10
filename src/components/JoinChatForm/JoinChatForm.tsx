import { useEffect, useState } from 'react'
import styles from './JoinChatForm.module.css'

/*export interface JoinChatFormSubmitData {
  name: string
}*/

export interface JoinChatFormProps {
  UserName: (userName: string) => void
}

export function JoinChatForm({UserName}: JoinChatFormProps) {
 
  const [userNickname, setUserNickname] = useState("");
  const [nickname, setNickname] = useState("");
  
  useEffect(() => { 
    UserName(nickname); 
    console.log(`2. Desde UseEfect JoinChatForm${nickname}`);
  }, [nickname]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    /*props.onSubmit && props.onSubmit({ name: 'name' });*/
    event.preventDefault();
    setNickname(event.currentTarget.elements[0].attributes[6].value);
    console.log(`1. Desde onSudmit evento click al boton de JoinChatForm${nickname}`)
  }

  return (
    <form onSubmit={onSubmit} className={styles.root}>
      <div className={styles.paragraphInfoSection}>
        <h2>Tienes nombre?</h2>
        <p className={styles.infP1}>
          Ingresa un nombre para poder iniciar <br />
          la conversación
        </p>
      </div>

      <div className={styles.inputsSection}>
        <input
          type="text"
          maxLength={40}
          minLength={4}
          className={styles.userNameInput}
          placeholder=" "
          value={userNickname}
          onChange={event => setUserNickname(event.target.value)}
          required
        />
        <button type="submit" className={styles.submitButton}>Guardar</button>
        <div className={styles.requirements}>
          Debe tener al menos cuatro caracteres
        </div>
      </div>

      <div className={styles.randomName}>
        <a href="#">Generar nombre random</a>
      </div>
    </form>
  )
}
