import styles from './Acts.module.css'
import Link from 'next/link'

export default function Acts({ icon, text, path }) {
    return (
        <Link href={`/${path}`} className={ `${ styles["dark-acts"] } ${styles.acts}` }>
            <img src={`./icons/${icon}.png`} alt={icon} />
            <span>{text}</span>
        </Link>
    )
}