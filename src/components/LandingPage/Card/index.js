import Link from 'next/link'
import styles from './Card.module.css'

export default function Card({children, title, text}) {
    return (
        <div className={ styles.card }>
            <div>
                {children}
            </div>
            <div>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
            <Link href="/registrar">Criar conta</Link>
        </div>
    )
}