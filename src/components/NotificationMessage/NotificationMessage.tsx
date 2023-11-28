import styles from './NotificationMessage.module.css'

export interface NotificationMessageProps {
    message: string;
    className?: string;
}


export function NotificationMessage(props: NotificationMessageProps) {
    return (
        <div className={styles.root + ' ' + props.className}>
            <p className={styles.notification}>{props.message}</p>
        </div>
    )
}