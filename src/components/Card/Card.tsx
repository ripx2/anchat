import { ReactNode } from 'react'
import styles from './Card.module.css'

export interface CardProps {
  children: ReactNode
}

export function Card(props: CardProps) {
  return <div className={styles.root}>{props.children}</div>
}
