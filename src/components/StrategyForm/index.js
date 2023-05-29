import { useContext, useEffect, useState } from 'react'
import Input from '../Input'
import styles from './StrategyForm.module.css'
import { sessionContext } from '../../../context/Session'
import { useRouter } from 'next/router'
import Text from '../Text'
import Botao from '../Botao'
import axios from 'axios'

export default function StrategyForm({ strategy, changeName, email }) {
    const router = useRouter()
    var params = router.query.id
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])

    const [ error, setError ] = useState({...strategy})
    const [ form, setForm ] = useState({})
    const [ exclude, setExclude ] = useState(false)

    //CAMPOS DO FORMULÁRIO DO PRODUTO
    const [ name, setName ] = useState('')
    const [ goal, setGoal ] = useState('')
    const [ product, setProduct ] = useState('')
    const [ data, setData ] = useState('')

    useEffect(() => {
        setName(strategy.name)
        setGoal(strategy.goal)
        setProduct((strategy.product).split(',')[0])
        setData(strategy.data)

        setForm({
            ...strategy
        })
    }, [strategy, userData])

    async function buttonClicked(e) {
        //EXCLUIR DADOS
        if (e.target.id === 'exclude') {
            setExclude(!exclude)
        }
        //CONFIRMAR EXCLUSÃO
        if (e.target.id === 'excludeConfirmed') {
            await axios.post('/api/crud/DELETE', ['strategy', parseInt(params.replace(':', '')) -1, email]).then(res => {
                //ATUALIZAR USUÁRIO NO LOCAL STORAGE
                //RESPONSE RETORNA O USUÁRIO ATUALZIADO
                session.setUser(res.data)
                router.back()
            }).catch(e => console.log(e))
        }
    }

    function inptChange(e) {
        const {name, value} = e.target

        setError({})
        if (name === 'name') {
            setName(value)
            changeName(value)
        }
        if (name === 'goal') setGoal(value)
        if (name === 'data') setData(value)
        if (name === 'product') setProduct(value)

        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function formSubmited(e) {
        e.preventDefault()

        //VERIFICAÇÃO DOS CAMPOS
        if (name === '') return setError({name: true})
        if (product === '') return setError({product: true})
        if (goal === '') return setError({goal: true})
        if (data === '') return setError({data: true})

        const dataInfo = [form, ['strategy', parseInt(params.replace(':', '')) -1, email]]

        //URL DA REQUISIÇÃO
        await axios.post('/api/crud/UPDATE', dataInfo).then(res => {
            //ATUALIZAR USUÁRIO NO LOCAL STORAGE
            //RESPONSE RETORNA O USUÁRIO ATUALZIADO
            session.setUser(res.data)

        }).catch(e => console.log(e))
    }

    return (
        Object.keys(strategy).length > 0 ?
        <>
            <form className={ styles.strategyForm } onSubmit={e => formSubmited(e)}>
                <Text title="Editar dados"  />
                <div style={{ marginTop: "24px" }} className={ styles.productInpt }>
                    <label>Nome</label>
                    <Input produto={true} size={true} errorVerify={error["name"] === true ? true : ''} inptChange={e => inptChange(e)} label="Nome" name="name" type="text" value={name}/>
                </div>
                <div className={ styles.productInpt }>
                    <label>Prazo</label>
                    <Input produto={true} size={true} errorVerify={error["data"] === true ? true : ''} inptChange={e => inptChange(e)} label="Data" name="data" type="date" value={data}/>
                </div>
                <div className={ styles.productInpt }>
                    <label>Produto</label>
                    <Input produto={true} size={true} errorVerify={error["product"] === true ? true : ''} inptChange={e => inptChange(e)} label="Produto" name="product" type="text" value={product} readonly={true}/>
                </div>
                <div className="flex-2">
                <Botao
                    sm={true}
                    level="2"
                    text="Exluir"
                    type="button"
                    buttonClicked={e => buttonClicked(e)}
                    />
                <Botao 
                    sm={true}
                    level="1"
                    text="salvar"
                    type="submit"
                    buttonClicked={e => buttonClicked(e)}
                />
            </div>
            {exclude ?
                <Botao
                    sm={true}
                    level="2"
                    text="Confirmar exclusão"
                    type="button"
                    top={true}
                    excludeConfirm={true}
                    buttonClicked={e => buttonClicked(e)}
                />
            : ''}
            </form>
        </>
        : ''
    )
}