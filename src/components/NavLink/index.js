import Link from 'next/link'
import styles from './NavLink.module.css'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { sessionContext } from '../../../context/Session'

export default function NavLink({ path, children, logout, secondary }) {
    const session = useContext(sessionContext)

    const router = useRouter()
    if (logout) {
        return <Link onClick={e => {
            session.deleteUser()
            router.push('/')
        }} href={path} className={ `${styles.navlink} ${router.pathname == `${path}` ? styles.active : ''}` }>{children}</Link>
    }

    return (
        <Link href={path} className={ `${styles.navlink} ${router.pathname.includes(path) ? styles.active : ''}` }>{children}</Link>
    )
}