import Text from '../Text'
import styles from './Details.module.css'

export default function Details({children}) {
    return (
        <div className={ styles.details }>
            <Text title="Detalhes" subtitle="" small={true} />
            <div>
                {children}
            </div>
        </div>
    )
}
Details.Equipe = ({name, totalIncome, type, produtos, clients, strategy}) => {
    return (
        <div className={ styles.details }>
            <Text title="Detalhes" subtitle="" />
            <div className={ styles.head }>
                <div className={ styles.svg}>
                    {strategy ?
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M22,22V10c0-.091-.109-9.093-9.572-9.987a2.838,2.838,0,0,0-2.881,1.8c-.992,2.47-2.886,3.583-5.424,4.5A3.235,3.235,0,0,0,2,9.355,2.649,2.649,0,0,0,4.645,12H9.82c-1.244,5.927-6.032,9.308-7.1,10H2a1,1,0,0,0,0,2H22a1,1,0,0,0,0-2ZM11.992,11.124A1,1,0,0,0,11,10H4.645A.645.645,0,0,1,4,9.355a1.231,1.231,0,0,1,.8-1.164c2.51-.9,5.256-2.275,6.6-5.631A.858.858,0,0,1,12.239,2,8.1,8.1,0,0,1,20,10V22H6.012A17.517,17.517,0,0,0,11.992,11.124Z"/></svg>                    
                    :
                    <>
                        {clients ?
                        <svg id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m20 8a8 8 0 1 0 -14 5.274v8.226a2.5 2.5 0 0 0 4.062 1.952l1.938-1.552 1.938 1.55a2.5 2.5 0 0 0 4.062-1.95v-8.226a7.957 7.957 0 0 0 2-5.274zm-8-6a6 6 0 1 1 -6 6 6.006 6.006 0 0 1 6-6zm3.717 19.948a.491.491 0 0 1 -.529-.06l-3.188-2.551-3.187 2.551a.5.5 0 0 1 -.813-.388v-6.582a7.935 7.935 0 0 0 8 0v6.582a.487.487 0 0 1 -.283.448z"/></svg>
                        :
                        <>
                        {produtos ?
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M9,14h6a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/><path d="M19,0H5A5.006,5.006,0,0,0,0,5V6A3,3,0,0,0,1,8.234V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V8.234A3,3,0,0,0,24,6V5A5.006,5.006,0,0,0,19,0ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V6a1,1,0,0,1-1,1H3A1,1,0,0,1,2,6ZM21,19a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V9H21Z"/></svg>  
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
                        }
                        </>
                        }
                    </>
                    }
                </div>
                <div>
                    {produtos || clients || strategy?
                    ''
                    :
                    <p className={` ${type === 'influencer' ? styles.influencer : ''} ${ styles.type }`}>{type}</p>
                    }
                    {strategy ?
                    <p style={{ textTransform: 'capitalize' }} className={ styles.name }>{name}</p>
                    :
                    <>
                    <p style={{ textTransform: 'capitalize' }} className={ styles.name }>{name}</p>
                    <p className={ styles.income }>R$ {totalIncome}</p>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}   