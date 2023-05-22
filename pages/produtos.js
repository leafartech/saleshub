import { useContext, useEffect, useState } from "react";
import Container from "../src/components/Container";
import Header from "../src/components/Header";
import Modal from "../src/components/Modal";
import Template from "../src/components/Template";
import Text from "../src/components/Text";
import { sessionContext } from "../context/Session";
import Table from "../src/components/Table";
import axios from "axios";

export default function Produtos() {
    //COLETADO DADOS DA SESSÃO
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])

    //DADOS DA TABELA
    const tableParams = {
        thead: ['Produto', 'Quantidade de Vendas', 'Receita Gerada'],
    }

    //CONFIGURAÇÕES DO MODAL
    const [ serverError, setServerError] = useState(false)
    const [ error, setError ] = useState(false)
    const [ modal, setModal ] = useState(false)

    //CONFIGURAÇÃO DOS VALORES DOS INPUTS
    const [ name, setName ] = useState('')
    const [ sellPrice, setSellPrice ] = useState('')
    const [ costPrice, setCostPrice ] = useState('')
    const [ form, setForm ] = useState({})

    //CONFIGURAÇÃO DOS CAMPOS DO MODAL
    const inptObj = [
        ['text', name, 'Nome', 'name'],
        [ 'number', costPrice, 'Custo', 'costPrice' ],
        ['number', sellPrice, 'Preço', 'sellPrice'],
    ]

    //ALTERANDO ESTADOS DO MODAL
    function modalHandler(e) {
        if (modal) {
            setModal(false)
            setServerError(false)
            setError(false)
            setName('')
        } else {
            setModal(true)
        }
    }

    function inptChange(e) {
        const {name, value} = e.target

        if (name === 'name') setName(value)
        if (name === 'sellPrice') setSellPrice(value)
        if (name === 'costPrice') setCostPrice(value)
        
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function formSubmited(e) {
        e.preventDefault()

        setError({})
        if (name === '') return setError({name: true})
        if (costPrice === '') return setError({costPrice: true})
        if (sellPrice === '') return setError({sellPrice: true})

        console.log(form)

        await axios.post('/api/crud/POST', {...form, product: true, "user": userData.email}).then(res => {
            if (res.data.error) {
                setServerError(true)
                return
            }
            //EXIBIR MENSAGEM DE SUCESSO DIRETAMENTE NA TELA?
            setServerError(false)
            session.setUser(res.data)
            setModal(false)

            //RECARREGA DADOS DA TABELA
            setName('')
            setCostPrice('')
            setSellPrice('')
            setUserData(JSON.parse(session.getUser()))
        }).catch(e => console.log(e))
    }

    const [ load, setLoad ] = useState(true)

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setLoad(false)
        }
    }, [userData])

    return (
        <Template>
            <Header />
            <Container load={load}>
                {!load ?
                <>
                <Text  title="Produtos" subtitle="Os produtos são a base de todo negócio. Invista neles!" buttonText="Novo produto" buttonClicked={e => modalHandler(e)} button={true} top={true}/>
                {Object.keys(userData).length > 0 ?
                <>
                    <Table produtos={true} url="produtos" tableData={userData['products']} type="equipe" tableParams={tableParams} />
                </>
                : ''}
                </>
                :''}
            </Container>
            <Modal generalError={serverError} error={error} onSubmitForm={e => formSubmited(e)} texto="Novo produto" buttonClicked={e => modalHandler(e)} modalState={modal} inptObj={inptObj} inptChangeModal={e => inptChange(e)}/>
        </Template>
    )
}