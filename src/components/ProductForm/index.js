import { useContext, useEffect, useState } from 'react'
import styles from './ProductForm.module.css'
import Botao from '../Botao'
import Input from '../Input'
import Text from '../Text'
import { sessionContext } from '../../../context/Session'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function ProdutForm({product}) {
    const router = useRouter()
    var params = router.query.id
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])

    const [ error, setError ] = useState({...product})
    const [ form, setForm ] = useState({})
    const [ exclude, setExclude ] = useState(false)

    //CAMPOS DO FORMULÁRIO DO PRODUTO
    const [ name, setName ] = useState('')
    const [ sellPrice, setSellPrice ] = useState('')
    const [ costPrice, setCostPrice ] = useState('')

    useEffect(() => {
        setName(product.name)
        setSellPrice(product.sellPrice)
        setCostPrice(product.costPrice)

        setForm({
            ...product
        })
    }, [product, userData])

    function inptChange(e) {
        const {name, value} = e.target

        setError({})
        if (name === 'name') setName(value)
        if (name === 'costPrice') setCostPrice(value)
        if (name === 'sellPrice') setSellPrice(value)

        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function buttonClicked(e) {
        //EXCLUIR DADOS
        if (e.target.id === 'exclude') {
            setExclude(!exclude)
        }

        //CONFIRMAR EXCLUSÃO
        if (e.target.id === 'excludeConfirmed') {
            await axios.post('/api/crud/DELETE', ['products', parseInt(params.replace(':', '')) -1, userData.email]).then(res => {
                //ATUALIZAR USUÁRIO NO LOCAL STORAGE
                //RESPONSE RETORNA O USUÁRIO ATUALZIADO
                session.setUser(res.data)
                router.back()
            }).catch(e => console.log(e))
        }
    }

    async function formSubmited(e) {
        e.preventDefault()

        if (name === '') return setError({name: true})
        if (costPrice === '') return setError({costPrice: true})
        if (sellPrice === '') return setError({sellPrice: true})

        const data = [form, ['products', parseInt(params.replace(':', '')) -1, userData.email]]

        //URL DA REQUISIÇÃO
        await axios.post('/api/crud/UPDATE', data).then(res => {
            //ATUALIZAR USUÁRIO NO LOCAL STORAGE
            //RESPONSE RETORNA O USUÁRIO ATUALZIADO
            session.setUser(res.data)

        }).catch(e => console.log(e))
    }

    return (
        Object.keys(product).length > 0 ?
            <>
                <form className={ styles.productForm } onSubmit={(e) => formSubmited(e)}>
                    <Text title="Editar dados"  />
                    <div style={{ marginTop: "24px" }} className={ styles.productInpt }>
                        <label>Nome</label>
                        <Input produto={true} size={true} errorVerify={error["name"] === true ? true : ''} inptChange={e => inptChange(e)} label="Nome" name="name" type="text" value={name}/>
                    </div>
                    <div className={ styles.productInpt }>
                        <label>Custo</label>
                        <Input produto={true} size={true} errorVerify={error["costPrice"] === true ? true : ''} inptChange={e => inptChange(e)} label="Custo" name="costPrice" type="number" value={costPrice}/>
                    </div>
                    <div className={ styles.productInpt }>
                        <label>Ticket</label>    
                        <Input produto={true} size={true} errorVerify={error["sellPrice"] === true ? true : ''} inptChange={e => inptChange(e)} label="Ticket" name="sellPrice" type="number" value={sellPrice}/>
                    </div>
                    <div className="flex-2">
                        <Botao 
                            sm={true}
                            level="1"
                            text="salvar"
                            type="submit"
                            buttonClicked={e => buttonClicked(e)}
                        />
                        <Botao
                            sm={true}
                            level="2"
                            text="Exluir"
                            type="button"
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