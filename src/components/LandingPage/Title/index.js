import styles from './Title.module.css'

export default function Title({children, top, subtitle}) {
    return (
        <div className={ styles.title }>
            {children}
        </div>
    )
}