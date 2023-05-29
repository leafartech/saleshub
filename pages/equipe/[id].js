import { useRouter } from "next/router"
import Template from "../../src/components/Template"
import { useContext, useEffect, useState } from "react"
import Text from "../../src/components/Text"
import Container from "../../src/components/Container"
import Navbar from "../../src/components/Navbar"
import { sessionContext } from "../../context/Session"
import Secondary from "../../src/components/Secondary"
import Details from "../../src/components/Details"
import EquipeForm from "../../src/components/EquipeForm"
import Team from "../../src/components/Team"
import Header from "../../src/components/Header"

export default function Equipe() {
    const router = useRouter()
    var params = router.query.id

    const thParams = ["Produto", "Quantidade", "Data"]
    
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

    //GRAVA OS DADOS DA SESSÃO EM userData. ALTERAR CAMPO "SELLERS" PARA O ESCOLHIDO
    let specific = {}
    if (params !== undefined && userData['sellers'] !== undefined) {
        specific = userData['sellers'][parseInt(params.replace(':', ''))-1]
    }

    //VARIÁVEIS DOS INPUTS
    //
    const [  name, setName ] = useState()
    const [  type, setType ] = useState('')
    const [  totalIncome, setTotalIncome ] = useState('')

    const [ load, setLoad ] = useState(true)

    //COLETA OS DADOS DO USUÁRIO DA SESSÃO
    useEffect(() => {
        setName(specific.name)
        setType(specific.type)
        setTotalIncome(specific.totalIncome)
    }, [specific])

    function changeName(name) {
        setName(name)
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
                {!load ?
                <>
                    <Text
                        backLink={true}
                        top={true}
                        title="Pessoas"
                        subtitle="Gerencie os detalhes de um dos vendedores da sua empresa, seja infuencer ou não."
                    />  
                    <Secondary>
                        {size && parseInt(size) <= 425 ? 
                        <EquipeForm changeName={value => changeName(value)} email={userData.email} specific={specific} />
                        :
                        ''
                        }
                        <Team specific={specific} team={true} sellers={specific} thParams={thParams} productName={name}/>
                        <div>
                            <Details.Equipe totalIncome={totalIncome} name={name} type={type} />
                            {size && parseInt(size) <= 425 ? 
                            ''
                            :
                            <EquipeForm changeName={value => changeName(value)} email={userData.email} specific={specific} />
                            }
                        </div>
                    </Secondary>
                </>
                : ''}
            </Container>
        </Template>
    )
}