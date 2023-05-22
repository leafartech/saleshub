import { useRouter } from "next/router"
import Text from "../../src/components/Text"
import Secondary from "../../src/components/Secondary"
import Container from "../../src/components/Container"
import Header from "../../src/components/Header"
import Template from "../../src/components/Template"
import { useContext, useEffect, useState } from "react"
import { sessionContext } from "../../context/Session"
import Strategy from "../../src/components/Stategy"
import Details from "../../src/components/Details"
import StrategyForm from "../../src/components/StrategyForm"
import Modal from "../../src/components/Modal"
import axios from "axios"

export default function Equipe() {
    const router = useRouter()
    var params = router.query.id

    //SALVAR SESSÃO E CARREGAR QUANDO SESSÃO FOR SALVA
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])
    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setLoad(false)
        }
    }, [userData])

    const [ load, setLoad ] = useState(true)

    let specific = {}
    if (params !== undefined && userData['strategy'] !== undefined) {
        specific = userData['strategy'][parseInt(params.replace(':', ''))-1]
    }

    const [  name, setName ] = useState()

    useEffect(() => {
        setName(specific.name)
    }, [specific])

    function changeName(name) {
        setName(name)
    }

    //Modal para adicionar nova tarefa a um membro da equipe
    const [ team, setTeam ] = useState('')
    const [ details, setDetails ] = useState('')
    const [ task, setTask ] = useState('')
    const [ deadline, setDeadline ] = useState('')

    const [ form, setForm ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ error, setError ] = useState({})
    const [ serverError, setServerError] = useState(false)

    const inptObj = [
        ['select', team, 'Pessoa', 'person'], 
        ['text', task, 'Tarefa', 'task'], 
        ['textarea', details, 'Detalhes', 'details'], 
        ['date', deadline, 'Prazo', 'deadline'],
    ]

    if (Object.keys(userData).length > 0) {
        let hlp = []
        inptObj[0].push(userData["sellers"])
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
        if (name === 'task') setTask(value)
        if (name === 'details') setDetails(value)
        if (name === 'deadline') setDeadline(value)

        setForm(prevState => ({
            ...prevState,
            [name]: value
        })) 
    }

    async function formSubmited(e) {
        e.preventDefault()

        if (name === '') return setError({name: true})
        if (task === '') return setError({task: true})
        if (details === '') return setError({details: true})
        if (deadline === '') return setError({deadline: true})

        await axios.post('/api/crud/POST', {...form, "user": userData.email, strategyTask: true, params: params.replace(':', '')}).then(res => {
            if (res.data.error) {
                setServerError(true)
                return
            }
            //EXIBIR MENSAGEM DE SUCESSO DIRETAMENTE NA TELA?
            setServerError(false)
            session.setUser(res.data)

            //RECARREGA DADOS DA TABELA
            setName('')
            setTask('')
            setDeadline('')
            setDetails('')
            setModal(false)
            setUserData(JSON.parse(session.getUser()))

        }).catch(e => console.log(e))
    }

    const [size, setSize] = useState()
    useState(() => {
        if (typeof window !== 'undefined') {
            setSize(window.screen.availWidth)
        }
    }, [])
    return (
        <Template>
            <Header secondary={true}/>
            <Container load={load}>
                {!load && Object.keys(specific).length > 0 ?
                <>
                    <Text
                        buttonClicked={e => modalHandler(e)}
                        button={true}
                        buttonText="Adicionar tarefa"
                        backLink={true}
                        top={true}
                        title="Estratégia"
                        subtitle="Gerencie e analise os detalhes de uma estratégia específica."
                    />  
                    <Secondary>
                        {size && parseInt(size) <= 425 ? 
                        <StrategyForm email={userData.email} changeName={value => changeName(value)} strategy={specific}/>
                        :
                        ''
                        }
                        <Strategy email={userData.email} params={params} specific={specific} />
                        <div>
                            <Details.Equipe name={name} strategy={true} />
                            {size && parseInt(size) <= 425 ? 
                            ''
                            :
                            <StrategyForm email={userData.email} changeName={value => changeName(value)} strategy={specific}/>
                            }
                        </div>
                    </Secondary>
                </>
                : ''}
            </Container>
            <Modal strategy={true} generalError={serverError} error={error} onSubmitForm={e => formSubmited(e)} texto="Nova tarefa" buttonClicked={e => modalHandler(e)} modalState={modal} inptObj={inptObj} inptChangeModal={e => inptChange(e)}/>
        </Template>
    )
}