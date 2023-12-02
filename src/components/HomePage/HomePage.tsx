import styles from './HomePage.module.css'
import { MdOutlineAddBox } from 'react-icons/md'

export function HomePage() {
  const iconStyle = {
    color: 'white',
    fontSize: '1.5rem',
    verticalAlign: 'middle',
  }
  return (
    <div className={styles.root}>
      <div className={styles.startElements}>
        <a className={styles.createChatText} href="#">
          Crea un chat para empezar
        </a>
        <button className={styles.createChatButton}>
          <MdOutlineAddBox style={iconStyle} />
        </button>
      </div>
    </div>
  )
}
