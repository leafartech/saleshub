import styles from './Secondary.module.css'

export default function Secondary({children}) {
    return (
        <div className={ styles.secondary }>
            {children}
        </div>
    )
}