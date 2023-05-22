import Link from 'next/link'
import styles from './Botao.module.css'
import { createRipples } from 'react-ripples'

const MyRipples = createRipples({
    color: '#7C79FF',
    during: 1000,
})
const MyRipplesNegative = createRipples({
    color: '#ff000060',
    during: 1000,
})

export default function Botao({ outline, inptSm, type, href, action, level, text, buttonClicked, modal, sm, top, excludeConfirm }) {
    if (action === 'link') {
        return (
            <MyRipples className={ `${outline ? styles.outline : ''} ${sm ? styles.sm : ''} ${styles.ripple} ${ styles.outline }`}  onClick={e => buttonClicked(e)}>
                <Link href={href} type={type} className={`${styles.botao}`}>
                    {text}
                </Link>
            </MyRipples>
        )
    }
    return (
        <>  
            { level === "1" ?
                <MyRipples className={ `${outline ? styles.outline : ''} ${inptSm ? styles.SSmBtn : ''} ${sm ? styles.sm : ''} ${styles.ripple}`}  onClick={e => buttonClicked(e)}>
                    <button type={type} className={`${styles.botao}`}>
                        {text}
                    </button>
                </MyRipples>
            :   
            ""
            }
            {modal ?
                <MyRipples className={ `${outline ? styles.outline : ''} ${inptSm ? styles.SSmBtn : ''} ${styles["ripple-2"]}`} onClick={e => buttonClicked(e)}>
                    <button type={type} className={`${styles.botao}`}>
                        {text}
                    </button>
                </MyRipples>
            : ''
            }
            {level === '2' ?
                <MyRipplesNegative className={ `${outline ? styles.outline : ''} ${inptSm ? styles.SSmBtn : ''} ${sm ? styles.sm : ''} ${styles['ripple-negative']} ${top ? styles.top : ''}` } id={excludeConfirm ? 'excludeConfirmed' : 'exclude'}>
                    <button id={excludeConfirm ? 'excludeConfirmed' : 'exclude'} type={type} onClick={e => buttonClicked(e)} className={`${ styles.botaoNegative} `}>
                        {text}
                    </button>
                </MyRipplesNegative>
            : ''
            }
            {level === 3 ?
                <MyRipples className={ `${styles.lvl3} ${outline ? styles.outline : ''} ${inptSm ? styles.SSmBtn : ''} ${sm ? styles.sm : ''} ${styles.ripple}`}  onClick={e => buttonClicked(e)}>
                    <button type={type} className={`${styles.botao}`}>
                        {text}
                    </button>
                </MyRipples>
            : ''}
        </>
    )
}