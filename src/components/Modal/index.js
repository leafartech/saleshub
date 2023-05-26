import Input from '../Input'
import Text from '../Text'
import styles from './Modal.module.css'
import Botao from '../Botao'
import Message from '../Message'

export default function Modal({ generalError, error, modalState, buttonClicked, inptChangeModal, inptObj, texto, onSubmitForm }) {
    function inptChanging(e) {
        inptChangeModal(e)
    }
    if (modalState) {
        return (
            <div className={ styles.modalDiv }>
                <div className={ styles.bg} onClick={e => buttonClicked(e) }></div>
                <form className={ `${styles["dark-forms"]} ${styles.forms}` } onSubmit={e => onSubmitForm(e)}>
                    {generalError ?
                        <Message top={true} body="Pessoa já foi adicionada." type={false}/>
                    : ''}
                    <div className={ styles.close } onClick={e => buttonClicked(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"/></svg>
                    </div>
                            
                    <Text center={true} top={true} title={texto} />
                    <div className={ styles.inpts }>
                        {inptObj.map((inpt, index) => (
                            
                            inpt[0] === 'textarea' ?
                            <div className={ styles.textareaDiv }>
                                {inpt[1] === '' ?
                                <label className={ styles.textareaLabel }>{inpt[2]}</label>
                                : ''}
                                <textarea rows="10" cols="10" value={inpt[1]} key={index} className={ error[inpt[3]] === true ? styles["error-input"] : ''} name={inpt[3]} onChange={e => inptChanging(e)}>
                                </textarea>
                                {error[inpt[3]] === true ?
                                <p className={ `${styles["error-message-text"]}` }>
                                    Preencha o campo acima corretamente
                                </p>
                                : ''}
                            </div>
                            :
                            <>
                                {inpt[0] === 'select' ?
                                <>
                                <select className={error[inpt[3]] === true ? styles["error-input"] : ''} key={index} name={inpt[3]} onChange={e => inptChanging(e)}>
                                    <option value={"1"}>{inpt[2]}</option>
                                    {inpt[4].map((opt, index) => (
                                        <>
                                            {opt.sellPrice ?
                                            <option key={index} value={[opt.name, opt.sellPrice, opt.costPrice]}>{opt.name}</option>
                                            :
                                            <option key={index} value={opt.name}>{opt.name}</option>
                                            }
                                        </>
                                    ))}
                                </select>
                                    {error[inpt[3]] === true ?
                                    <p className={ `${styles["error-message"]}` }>
                                        Preencha o campo acima corretamente
                                    </p>
                                    : ''}
                                </>
                                :
                                <Input errorVerify={error[`${inpt[3]}`] ? true : ''} key={index} inptChange={e => inptChanging(e)} radioLb={inpt[4]} value={inpt[1]} label={inpt[2]} name={inpt[3]} type={inpt[0]} />
                                }
                            </>
                        ))}
                    </div>
                    <Botao level="1" type="submit" text="Concluir" buttonClicked={() => {}}/>
                </form>
            </div>
        )
    }
}