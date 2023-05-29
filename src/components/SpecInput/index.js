import styles from './SpecForm.module.css'

export default function SpecInput({ readonly, name, type, label, value, inptChange, errorVerify }) {
    return (
        <div className={ styles.formDiv }>
            <label className={errorVerify ? styles["label-error"] : '' } htmlFor={label}>{label}</label>
            <div>
                <input className={errorVerify ? styles["inpt-error"] : '' } readOnly={readonly} onChange={e => inptChange(e)} type={type} id={label} name={name} value={value} />
                {errorVerify ?
                    <p className={errorVerify ? styles["p-error"] : ''}>O campo acima precisa ser preenchido.</p>
                : ''
                }
            </div>
        </div>
    )
}