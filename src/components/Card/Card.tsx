import { ReactNode } from 'react'
import styles from './Card.module.css'

export interface CardProps {
  children: ReactNode
  className?: string
}

export function Card(props: CardProps) {
  return (
    <div className={styles.root + ' ' + props.className}>{props.children}</div>
  )
}
