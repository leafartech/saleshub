import styles from './Template.module.css'

export default function Template({ children, secondary }) {
    // if (secondary) {
    //     return (
    //         <div className={ `${styles["dark-template"]} ${styles["secondary-template"]}` }>
    //             {children}
    //         </div>
    //     )
    // }
    return (
        <div className={ `${styles["dark-template"]} ${styles.template}` }>
            { children }
        </div>
    )
}