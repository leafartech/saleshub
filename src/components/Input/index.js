import { useState } from 'react'
import styles from './Input.module.css'

export default function Input({ readonly, inptSm, type, name, label, value, inptChange, errorVerify, radioLb, size, produto }) {
    const [ toggle, setToggle ] = useState(false)
    function labelAnimation(e, verify) {
        const id = e.target.id

        if (toggle && verify === 'active' && !produto) {
            if (value !== '') {
                document.querySelector(`#${id}`).style.borderBottom = '2px solid var(--dark-main1)'
            } else {
                document.querySelector(`#label-${id}`).style = {
                    transform: '24px',
                    fontSize: 'var(--font-small)',
                    color: 'var(--dark-disable)',
                    fontWeight: 'var(--font-normal)'
                }
            }
        } else if (!produto) {
            document.querySelector(`#label-${id}`).style.transform = 'translateY(4px)'
            document.querySelector(`#label-${id}`).style.color = 'var(--dark-main1)'
            document.querySelector(`#label-${id}`).style.fontWeight = 'var(--font-semibold)'
            document.querySelector(`#label-${id}`).style.fontSize = '12px'
            setToggle(true)
        }
    }

    return (
        <div className={`${size ? styles.inptSm : ''} ${styles.formControl}`}>
            { type === 'select' ?
            <select name={name} onChange={e => inptChange(e)}>
                    <option>{label}</option>
                    <option>{label}</option>
                    <option>{label}</option>
            </select>
            :
            <>
                { type === 'date' ?
                    <>
                        <input className={`${errorVerify ? styles["error-input"] : ''}`} type={type} name={name} value={value} placeholder='10/05/2023' onChange={e => inptChange(e)}/>
                        { errorVerify ? 
                        <p className={ `${styles["error-message"]}` }>
                            {type === 'date' ?
                                'Preencha o campo acima corretamente'
                            : ''}
                        </p>
                        : ''}
                    </>
                : 
                <>
                    {type === 'radio' ?
                        <div className={ styles.radioInpt }>
                            <div value={'vendedor'} onClick={e => inptChange(e)}>
                                <input style={{ backgroundColor: ''}} type="radio" id="vendedor" value={radioLb[0]} name="type" defaultChecked />
                                <label htmlFor="vendedor">{radioLb[0]}</label>
                            </div>
                            <div value={''} onClick={e => inptChange(e)}>
                                <input type="radio" id="influencer" value={radioLb[1]} name="type" />
                                <label htmlFor="influencer">{radioLb[1]}</label>
                            </div>
                        </div>
                    : 
                        <>
                            {produto ?
                                <>
                                { readonly ?
                                <>
                                <input readOnly className={`${errorVerify ? styles["error-input"] : ''}`} onChange={e => inptChange(e)} value={value} onFocus={e => labelAnimation(e, 'noactive')} onBlur={e => labelAnimation(e, 'active')} type={ type } name={ name } id={ label }/>
                                <span></span>
                                { errorVerify ? 
                                <p className={ `${styles["error-message"]}` }>
                                    {type === 'text' ?
                                        'Preencha o campo acima corretamente'
                                    : ''}
                                    {type === 'email' ?
                                        'Siga o formato: exemplo@gmail.com'
                                    : ''}
                                    {type === 'password' ?
                                        'Precisa de 1 letra maiúscula'
                                    : ''}
                                    {type === 'number' ?
                                        'Preencha o campo acima corretamente'
                                    : ''}
                                    {type === 'date' ?
                                        'Preencha o campo acima corretamente'
                                    : ''}
                                </p>
                                : ""}
                                </>
                                : 
                                <>
                                    <input className={`${errorVerify ? styles["error-input"] : ''}`} onChange={e => inptChange(e)} value={value} onFocus={e => labelAnimation(e, 'noactive')} onBlur={e => labelAnimation(e, 'active')} type={ type } name={ name } id={ label }/>
                                    <span></span>
                                    { errorVerify ? 
                                    <p className={ `${styles["error-message"]}` }>
                                        {type === 'text' ?
                                            'Preencha o campo acima corretamente'
                                        : ''}
                                        {type === 'email' ?
                                            'Siga o formato: exemplo@gmail.com'
                                        : ''}
                                        {type === 'password' ?
                                            'Precisa de 1 letra maiúscula'
                                        : ''}
                                        {type === 'number' ?
                                            'Preencha o campo acima corretamente'
                                        : ''}
                                        {type === 'date' ?
                                            'Preencha o campo acima corretamente'
                                        : ''}
                                    </p>
                                    : ""}
                                </>
                                }
                                </>
                            : 
                            <>
                                <label className={`${inptSm ? styles.labelSSm : ''} ${errorVerify ? styles["error-label"] : ''}`} id={ `label-${label}` }>{label}</label>
                                <input className={`${inptSm ? styles.inptSSm : ''} ${errorVerify ? styles["error-input"] : ''}`} onChange={e => inptChange(e)} value={value} onFocus={e => labelAnimation(e, 'noactive')} onBlur={e => labelAnimation(e, 'active')} type={ type } name={ name } id={ label }/>
                                <span></span>
                                { errorVerify ? 
                                <p className={ `${styles["error-message"]}` }>
                                    {type === 'text' ?
                                        'Preencha o campo acima corretamente'
                                    : ''}
                                    {type === 'email' ?
                                        'Siga o formato: exemplo@gmail.com'
                                    : ''}
                                    {type === 'password' ?
                                        'Precisa de 1 letra maiúscula'
                                    : ''}
                                    {type === 'number' ?
                                        'Preencha o campo acima corretamente'
                                    : ''}
                                    {type === 'date' ?
                                        'Preencha o campo acima corretamente'
                                    : ''}
                                </p>
                                : ""}
                            </>
                            }
                        </>
                    }
                </>
                }
            </>
            }
            </div>
    )
}