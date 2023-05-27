import Link from 'next/link'
import styles from './Price.module.css'

export default function Price({price, mainText, cta, path, children}) {
    return (
        <div className={ styles.price }>
            <h4>{mainText}</h4>
            <h6>{price}</h6>
            <div className={ styles.includes }>
                {children}
            </div>
            <Link href={path}>{cta}</Link>
        </div>
    )
}