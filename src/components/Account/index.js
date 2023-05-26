import styles from './Account.module.css'

export default function Account({ children }) {
    return (
        <main className={ `${styles["dark-account"]} ${styles.account}` }>
            {children}
        </main>
    )
}