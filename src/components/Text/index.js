import { useRouter } from 'next/router'
import Botao from '../Botao'
import styles from './Text.module.css'

export default function Text({ backLink, buttonClicked, center, title, subtitle, colored, top, small, button, buttonText, medium }) {
    const router = useRouter()
    
    function modalOpen(e) {
        buttonClicked(e)
    }

    function redirectBack(e) {
        router.back()
    }

    if (center) {
        return (
            <div style={{ width: '100%', textAlign: 'center', alignItems: 'center'}} className={ `${styles["dark-text"]} ${styles.text} ${colored ? styles.colored : ''} ${top ? styles.topText : ''} ${small ? styles.small : ''}` }>
                <h2>{ title }</h2>
                <p>{ subtitle }</p>
            </div>
        )
    } 
 return (
    <div className={ `${backLink ? styles.mtop : ''} ${styles["dark-text"]} ${styles.text} ${colored ? styles.colored : ''} ${top ? styles.topText : ''} ${small ? styles.small : ''} ${medium ? styles.medium : ''}` }>
        {backLink ?
            <span className={ styles.back } onClick={e => redirectBack(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z"/></svg>
                Voltar
            </span>
        : ''}
        <div>
            <h2>{ title }</h2>
            <p>{ subtitle }</p>
        </div>
        { button ?
        <Botao modal={true} buttonClicked={e => modalOpen(e)} level="3" text={buttonText} />
        : ''}
    </div>
 )
}