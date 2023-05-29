import { useContext, useEffect, useState } from "react";
import Container from "../src/components/Container";
import Header from "../src/components/Header";
import Modal from "../src/components/Modal";
import Template from "../src/components/Template";
import Text from "../src/components/Text";
import { sessionContext } from "../context/Session";
import axios from "axios";
import Table from "../src/components/Table";

export default function Estrategias() {
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])

    const [ load, setLoad ] = useState(true)

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setLoad(false)
        }
    }, [userData])

    const [ name, setName ] = useState('')
    const [ product, setProduct ] = useState('')
    const [ goal, setGoal ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ data, setData ] = useState('')

    const [ form, setForm ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ error, setError ] = useState({})
    const [ serverError, setServerError] = useState(false)

    const inptObj = [
        ['text', name, 'Nome', 'name'], 
        ['select', product, 'Produto', 'product'],
        ['text', goal, 'Objetivo', 'goal'], 
        ['textarea', description, 'Descrição', 'description'], 
        ['date', data, 'Data Limite', 'data']
    ]

    const tableParams = {
        thead: ['Estratégia', 'Equipe', 'Prazo'],
    }

    if (Object.keys(userData).length > 0) {
        inptObj[1].push([...userData["products"]])
    }

    function modalHandler(e) {
        if (modal) {
            setModal(false)
            setServerError(false)
            setError(false)
        } else {
            setModal(true)
        }
    }

    function inptChange(e) {
        const { name, value } = e.target

        if (name === 'name') setName(value)
        if (name === 'description') setDescription(value)
        if (name === 'product') setProduct(value)
        if (name === 'data') setData(value)
        if (name === 'goal') setGoal(value)

        setForm(prevState => ({
            ...prevState,
            [name]: value
        })) 
    }

    async function formSubmited(e) {
        e.preventDefault()

        if (name === '') return setError({name: true})
        if (product === '') return setError({product: true})
        if (goal === '') return setError({goal: true})
        if (description === '') return setError({description: true})
        if (data === '') return setError({data: true})

        await axios.post('/api/crud/POST', {...form, "user": userData.email, strategy: true}).then(res => {
            if (res.data.error) {
                setServerError(true)
                return
            }
            //EXIBIR MENSAGEM DE SUCESSO DIRETAMENTE NA TELA?
            setServerError(false)
            session.setUser(res.data)

            //RECARREGA DADOS DA TABELA
            setName('')
            setProduct('')
            setData('')
            setDescription('')
            setGoal('')
            setModal(false)
            setUserData(JSON.parse(session.getUser()))

        }).catch(e => console.log(e))
    }

    return (
        <Template>
            <Header />
            <Container load={load}>
                {!load ?
                <>
                <Text title="Estratégias" subtitle="Gerencie e analise as estratégias de Marketing utilizadas em algum produto." buttonClicked={e => modalHandler(e)} buttonText="Criar estratégia" button={true} top={true} />
                {Object.keys(userData).length > 0 ?
                <>
                    <Table strategy={true} url="estrategias" tableData={userData['strategy']} type="estrategias" tableParams={tableParams} />
                </>
                : ''}
                </>
                :
                ''
                }
            </Container>
            <Modal generalError={serverError} error={error} onSubmitForm={e => formSubmited(e)} texto="Criar estratégia" buttonClicked={e => modalHandler(e)} modalState={modal} inptObj={inptObj} inptChangeModal={e => inptChange(e)}/>
        </Template>
    )
}