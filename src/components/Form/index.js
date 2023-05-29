import Text from '@/components/Text'
import styles from './Form.module.css'
import Input from '@/components/Input'
import { useContext, useState } from 'react'
import axios from 'axios'
import Botao from '../Botao'
import Message from '../Message'
import { useRouter } from 'next/router'
import { sessionContext } from '../../../context/Session'
import Link from 'next/link'

export default function Form({ type }) {
    const session = useContext(sessionContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [form, setForm] = useState({})
    const [error, setError] = useState({})
    const [sent, setSent] = useState(false)
    const [messages, setMessage] = useState('')
    const [accountCreated, setAccountCreated ] = useState(false)
    const router = useRouter()

    function inptChange(e) {
        const {name, value} = e.target

        if (name === 'name') setName(value)
        if (name === 'email') setEmail(value)
        if (name === 'senha') setPassword(value)

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function formSubmited(e) {
        e.preventDefault()

        setError('')
        if (type === 'login') {
            if (email === '') return setError({email: true})
            if (password === '') return setError({password: true})
        } else {
            if (name === '') return setError({name: true})
            if (email === '') return setError({email: true})
            if (password === '') return setError({password: true})
        }

        if (type === 'login') {
            await axios.post('/api/user/login', form).then(res => {
                setSent(true)
                setMessage('Verificando dados...')
                setTimeout(() => {
                    if (res.status === 200 && typeof res.data !== 'string') {
                        setMessage('Verificando dados...')
                        setTimeout(() => {
                            setMessage('Entrando na conta...')
                            session.setUser(res.data)
                        }, "500")
                        setTimeout(() => {
                            setMessage('Estamos te redirecionando...')
                        }, "1000")
                        setTimeout(() => {
                            router.push('/geral')
                        }, "1500")
                    } else {
                        setSent(false)
                        setError({general: true})
                        setMessage('E-mail ou senha inválidos')
                        setName('')
                        setEmail('')
                        setPassword('')
                        setForm({})
                    }
                }, "1000")
            }).catch(err => console.log(err))
        } else {
            await axios.post('/api/user/register', form).then(res => {
                setSent(true)
                setMessage('Verificando dados...')
                setTimeout(() => {
                    if (res.status === 200 && res.data.success === true) {
                        setTimeout(() => {
                            setMessage('Criando conta...')
                        }, "2000")
                        setTimeout(() => {
                            setAccountCreated(true)
                            setMessage('Sua conta foi criada!')
                            session.setUser(res.data)
                        }, "3000")
                        setTimeout(() => {
                            setAccountCreated(false)
                            setMessage('Estamos te redirecionando...')
                        }, "4500")
                        setTimeout(() => {
                            router.push('/geral')
                        }, "6000")
                    } else {
                        setSent(false)
                        setError({general: true})
                        setMessage('Usuário já existe')
                        setName('')
                        setEmail('')
                        setPassword('')
                        setForm({})
                    }
                }, "1000")
            }).catch(err => console.log(err))
        }
        
    }
    if (type === 'login') {
        return (
            <form onSubmit={e => formSubmited(e)} className={ `${styles["dark-forms"]} ${styles.forms}` }>
                {error["general"] ? 
                    <Message body={messages} type={false}/>
                : ''}
                <Text center={true} title="Entrar" top={true}/>
                {sent ?
                <div className={styles.spinner}>
                    { accountCreated ?
                        <svg style={{ fill: 'var(--dark-success)' }} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="48" height="48"><path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"/></svg>
                    : 
                    <div className={styles["dot-spinner"]}>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                    </div>
                    }
                    <p>{messages}</p>
                </div>
                : 
                <>
                    <div className={ styles.inpts }>
                    <Input errorVerify={error["email"] === true ? true : ''} inptChange={inptChange} value={email} label="E-mail" name="email" type="email" />
                    <Input errorVerify={error["password"] === true ? true : ''} inptChange={inptChange} value={password} label="Senha" name="senha" type="password" />
                    </div>
                </>
                }
                <Botao type="submit" text="Entrar" level="1" buttonClicked={() => {}}/>
                <Link href="/registrar" className={ styles.link }>não possui uma conta?</Link>
            </form>
        )
    }
    return (
        <form onSubmit={e => formSubmited(e)} className={ `${styles["dark-forms"]} ${styles.forms}` }>
            {error["general"] ? 
                <Message body={messages} type={false}/>
            : ''}
            <Text center={true} title="Crie uma conta" top={true}/>
                {sent ?
                <div className={styles.spinner}>
                    { accountCreated ?
                        <svg style={{ fill: 'var(--dark-success)' }} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="48" height="48"><path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"/></svg>
                    : 
                    <div className={styles["dot-spinner"]}>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                        <div className={styles["dot-spinner__dot"]}></div>
                    </div>
                    }
                    <p>{messages}</p>
                </div>

                : 
                <>
                    <div className={ styles.inpts }>
                    <Input errorVerify={error["name"] === true ? true : ''} inptChange={inptChange} value={name} label="Nome" name="name" type="text" />
                    <Input errorVerify={error["email"] === true ? true : ''} inptChange={inptChange} value={email} label="E-mail" name="email" type="email" />
                    <Input errorVerify={error["password"] === true ? true : ''} inptChange={inptChange} value={password} label="Senha" name="senha" type="password" />
                    </div>
                </>
                }
                <Botao type="submit" text="Criar conta" level="1" buttonClicked={() => {}}/>
                <Link href="/entrar" className={ styles.link }>já possui uma conta?</Link>
        </form>
    )
}
