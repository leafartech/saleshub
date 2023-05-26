import { useState } from 'react'
import styles from './Dropdown.module.css'

export default function Dropdown({favorite, id, title, number, children}) {
    const [ dropdown, setDropdown ] = useState({})

    function dropdownHandler(e) {
        setDropdown(prevState => ({
            ...prevState,
            [id]: !dropdown[id],
          }));
    }

    return (
        <div className={ styles.dropdown }>
            <div className={ styles.number } onClick={e => dropdownHandler(e)}>
                <span>{number}</span>
                <h5>{title}</h5>
                <svg className={ dropdown[id] ? styles.active : '' } xmlns="http://www.w3.org/2000/svg" id="0" viewBox="0 0 24 24" width="512" height="512"><path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"/></svg>
            </div>
            <div className={`${dropdown[id] ? styles.active : ""} ${styles.dropdownDiv}` }>
                {children}
            </div>
        </div>
    )
}