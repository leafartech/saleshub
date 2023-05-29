import Navbar from "../Navbar";
import styles from './Header.module.css'

export default function Header({ secondary }) {
    return (
        <header className={ styles.header}>
            <Navbar secondary={secondary}/>
        </header>
    )
}