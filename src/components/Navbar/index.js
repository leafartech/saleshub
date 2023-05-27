import { useContext, useState } from 'react'
import NavLink from '../NavLink'
import styles from './Navbar.module.css'
import { themeContext } from '../../../context/Theme'

export default function Navbar({ secondary }) {
    const [ menuStatus, setMenuStatus ] = useState(false)
    const themeAll = useContext(themeContext)

   const {theme, setTheme} = themeAll

    function hamburguerHandler(e) {
        setMenuStatus(!menuStatus)
    }
    function themeHandler() {
        if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }
    return (
        <div className={ `${styles.navbar} ${styles["dark-navbar"]}` }>
            <div className={ styles.divImg }>
                {secondary ?
                <img src="../images/dark-logo.png" alt="Sales Hub Logo" />
                : 
                <img src="./images/dark-logo.png" alt="Sales Hub Logo" />
                }
            </div>
            <nav>
                <div className={`${menuStatus ? styles.menuOpened : ''} ${styles.hamburguer}`} onClick={e => hamburguerHandler(e)}>
                    <div className={ `${styles["hamburguer-item"]} ${styles["item-1"]}`}></div>
                    <div className={ `${styles["hamburguer-item"]} ${styles["item-2"]}`}></div>
                    <div className={ `${styles["hamburguer-item"]} ${styles["item-3"]}`}></div>
                </div>
                <ul className={ `${menuStatus ? styles.menuOpened : ''} ${styles.menu}` }>
                    <li>
                        <NavLink path="/geral">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/></svg>
                            <span>
                                Visão Geral
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink path="/clientes">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M18,8.5a2.5,2.5,0,0,1-5,0A2.5,2.5,0,0,1,18,8.5Zm-.006,6.866a11.065,11.065,0,0,1-1.163,4.569A7.634,7.634,0,0,1,10,24H9V18.5A3.517,3.517,0,0,0,5.5,15H0V14A7.634,7.634,0,0,1,4.065,7.169,11.065,11.065,0,0,1,8.634,6.006,15.487,15.487,0,0,1,20.972,0h0A3.009,3.009,0,0,1,24,3,15.507,15.507,0,0,1,17.994,15.366ZM2.084,13H4.346A34.361,34.361,0,0,1,6.955,8.237a8.993,8.993,0,0,0-1.993.72A5.519,5.519,0,0,0,2.084,13Zm13.679,4.045A34.361,34.361,0,0,1,11,19.654v2.262a5.519,5.519,0,0,0,4.043-2.878A8.993,8.993,0,0,0,15.763,17.045ZM22,2.972A1,1,0,0,0,21,2c-5.16.147-8.65,2.124-12.018,6.822a29.92,29.92,0,0,0-2.471,4.271,5.5,5.5,0,0,1,4.4,4.4,29.92,29.92,0,0,0,4.271-2.471C19.876,11.65,21.853,8.16,22,2.972ZM6.122,17.879a3.015,3.015,0,0,1,0,4.242c-.907.906-3.622,1.465-4.748,1.664l-1.406.247.247-1.406c.2-1.126.758-3.841,1.664-4.748A3.073,3.073,0,0,1,6.122,17.879ZM5,20a.993.993,0,0,0-.293-.707,1,1,0,0,0-1.414,0A7.318,7.318,0,0,0,2.5,21.5a7.342,7.342,0,0,0,2.208-.794A.993.993,0,0,0,5,20Z"/></svg>
                            <span>
                                Clientes
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink path="/equipe">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"/></svg>
                            <span>Equipe</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink path="/produtos">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M19.5,16c0,.553-.447,1-1,1h-2c-.553,0-1-.447-1-1s.447-1,1-1h2c.553,0,1,.447,1,1Zm4.5-1v5c0,2.206-1.794,4-4,4H4c-2.206,0-4-1.794-4-4v-5c0-2.206,1.794-4,4-4h1V4C5,1.794,6.794,0,9,0h6c2.206,0,4,1.794,4,4v7h1c2.206,0,4,1.794,4,4ZM7,11h10V4c0-1.103-.897-2-2-2h-6c-1.103,0-2,.897-2,2v7Zm-3,11h7V13H4c-1.103,0-2,.897-2,2v5c0,1.103,.897,2,2,2Zm18-7c0-1.103-.897-2-2-2h-7v9h7c1.103,0,2-.897,2-2v-5Zm-14.5,0h-2c-.553,0-1,.447-1,1s.447,1,1,1h2c.553,0,1-.447,1-1s-.447-1-1-1ZM14,5c0-.553-.447-1-1-1h-2c-.553,0-1,.447-1,1s.447,1,1,1h2c.553,0,1-.447,1-1Z"/></svg>
                            <span>Produtos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink path="/estrategias">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M20,18.172V8.5c0-.079-.1-7.963-8.536-8.5A1.983,1.983,0,0,0,9.411,1.385a5.29,5.29,0,0,1-3.5,3.846A3.018,3.018,0,0,0,4,8.025,1.977,1.977,0,0,0,5.975,10h4.247a5.681,5.681,0,0,1-3.181,3.416A5.075,5.075,0,0,0,4,18v.17A3,3,0,0,0,5,24H19a3,3,0,0,0,1-5.828ZM7.861,15.24a7.769,7.769,0,0,0,4.625-6.076A1,1,0,0,0,11.5,8L6,8.025a1.025,1.025,0,0,1,.663-.94A7.333,7.333,0,0,0,11.339,2,6.607,6.607,0,0,1,18,8.5V18H6A3.036,3.036,0,0,1,7.861,15.24ZM19,22H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z"/></svg>
                            <span>Estratégias</span>
                        </NavLink>
                    </li>
                    <div className={ styles.bottom }>
                        <li>
                            <NavLink path="/" logout={true}>
                                <svg style={{ transform: 'rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/></svg>
                                <span>Sair</span>
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}