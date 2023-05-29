import Botao from '../../Botao'
import styles from './HeroFlex.module.css'

export default function HeroFlex({path, topText, mainText, description, reverse, textOnly}) {
    return (
        <div className={ `${reverse ? styles.reverse : ''} ${styles.heroFlex} ${textOnly ? styles.textOnly : ''}` }>
            {textOnly ?
            ''
            :
            <div className={ styles.imgDiv }>
                <img src={path} alt=""/>
            </div>
            }
            <div className={ `${textOnly ? styles.textOnly : ''} ${styles.text}` }>
                <h5>{topText}</h5>
                <h2>{mainText}</h2>
                <p>{description}</p>
                <Botao action="link2"  buttonClicked={() => {}} href="/registrar" text="Criar conta gratuita"/>
            </div>
        </div>
    )
}