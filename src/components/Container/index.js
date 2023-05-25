import styles from './Container.module.css'

export default function Container({ children, load }) {
    return (
        <main className={ `${load ? styles.pageLoad : ''} ${styles.container}` }>
            <>
                {load ?
                    <div className={styles["dot-spinner"]}>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                    </div>
                : 
                    <>
                        {children}
                    </>
                }
            </>
        </main>
    )
}