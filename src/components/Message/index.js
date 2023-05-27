import styles from './Message.module.css'

export default function Message({type, body, top}) {
    if (!type) {
        return (
            <p className={ `${styles.error} ${top ? styles.top : ''}` }>{body}</p>
        )
    }

    return (
        <p className={ styles.success }>{body}</p>
    )
}