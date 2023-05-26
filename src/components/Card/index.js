import styles from './Card.module.css'

export default function Card({ title, main, icon }) {
    return (
        <div className={ `${styles["dark-card"]} ${styles.card}` }>
            <div className={ styles.divImg }>
                <img src={ `./icons/${icon}.png` } alt={title} />
            </div>
            <div className={ styles.text }>
                <p>{title}</p>
                <h5>{main}</h5>
            </div>
        </div>
    )
}