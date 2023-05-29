import Container from "../src/components/Container";
import Header from "../src/components/Header";
import Template from "../src/components/Template";
import Text from "../src/components/Text";
import Table from "../src/components/Table";
import Modal from "../src/components/Modal";
import axios from "axios";
import { sessionContext } from "../context/Session";
import { useContext, useEffect, useState } from "react";

export default function Vendedores() {
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])

    const [ nome, setNome ] = useState('')
    const [ idade, setIdade ] = useState('')
    const [ genero, setGenero ] = useState('')
    const [ tipo, setTipo ] = useState('vendedor')
    const [ comission, setComission] = useState('')
    const [ form, setForm ] = useState({type: 'vendedor'})
    const [ modal, setModal ] = useState(false)
    const [ error, setError ] = useState({})
    const [ serverError, setServerError] = useState(false)
    const tableParams = {
        thead: ['Pessoa', 'Quantidade de Vendas', 'Receita Gerada'],
    }

    //Type, value, Label, Name
    const inptObj = [
        ['radio', tipo, 'Tipo', 'type', ['vendedor', 'influencer']],
        ['text', nome, 'Nome', 'name'], 
        ['number', idade, 'Idade', 'age'], 
        ['text', genero, 'Gênero', 'gender'],
        ['number', comission, 'Comissão', 'comission'],
    ]

    function modalHandler(e) {
        if (modal) {
            setModal(false)
            setServerError(false)
            setError(false)
            setNome('')
            setIdade('')
            setGenero('')
            setComission('')
        } else {
            setModal(true)
        }
    }

    function inptChange(e) {
        const {name, value} = e.target

        if (name === 'type' && name !== undefined) setTipo(value)
        if (name === 'name') setNome(value)
        if (name === 'age') setIdade(value)
        if (name === 'gender') setGenero(value)
        if (name === 'comission') setComission(value)
        
        setForm(prevState => ({
            ...prevState,
            user: userData,
            [name]: value
        }))
    }

    async function formSubmited(e) {
        e.preventDefault()
        
        setError({})
        if (tipo === '') return setError({type: true})
        if (nome === '') return setError({name: true})
        if (idade === '') return setError({age: true})
        if (genero === '') return setError({gender: true})
        if (comission === '') return setError({comission: true})

        await axios.post('/api/crud/POST', form).then(res => {
            if (res.data.error) {
                setServerError(true)
                return
            }
            //EXIBIR MENSAGEM DE SUCESSO DIRETAMENTE NA TELA?
            setServerError(false)
            session.setUser(res.data)
            setModal(false)

            //RECARREGA DADOS DA TABELA
            setNome('')
            setGenero('')
            setIdade('')
            setTipo('')
            setComission('')
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
                <Text title="Equipe" subtitle="Quem será o melhor vendedor da equipe?" buttonText="Adicionar pessoa" buttonClicked={e => modalHandler(e)} button={true} top={true} />
                {Object.keys(userData).length > 0 ?
                <>
                    <Table url="equipe" tableData={userData['sellers']} type="equipe" tableParams={tableParams} />
                </>
                : ''}
                </>
                : ''}
            </Container>
            <Modal generalError={serverError} error={error} onSubmitForm={e => formSubmited(e)} texto="Adicionar pessoa" buttonClicked={e => modalHandler(e)} modalState={modal} inptObj={inptObj} inptChangeModal={e => inptChange(e)}/>
        </Template>
    )
}