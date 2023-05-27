import Botao from '../../Botao'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={ styles.header }>
            <nav className={ styles['header-nav']}>
                <img src="./images/dark-logo.png" alt="LOGO SALES HUB"/>
                <Botao action="link2" buttonClicked={() => {}} sm={true} href={"/registrar"} text="Criar conta" level="1"/>
            </nav>
            <div className={ styles.text }>
                <h5>PLATAFORMA COMPLETA</h5>
                <h1>
                    Tudo o que você precisa para administrar<br/> 
                    as suas vendas em <span>um só lugar
                    <svg width="193" height="20" viewBox="0 0 193 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10.7543C2 10.7543 87.3187 8.3285 129.943 5.83265C150.092 4.6528 170.42 2.68422 190.592 2.00472C192.609 1.93678 186.592 2.61701 184.635 3.13259C179.746 4.42079 174.974 6.16636 170.037 7.26812C157.53 10.0597 144.618 10.417 131.874 10.5834C128.285 10.6302 124.657 10.4971 121.073 10.7543C120.479 10.7969 118.924 11.3242 119.469 11.5745C124.185 13.7412 129.883 14.6549 134.82 16.2227C138.679 17.4485 142.307 18 136.456 18" stroke="#6A66FF" stroke-width="3" stroke-linecap="round"/>
                    </svg></span>
                </h1>
            </div>
            <div className={ styles['main-img']}>
                <img src="./images/mockup.png" alt="Mockup principal" />
            </div>
        </header>
    )
}