import { useRouter } from "next/router";
import Container from "../../src/components/Container";
import Navbar from "../../src/components/Navbar";
import Template from "../../src/components/Template";
import { useContext, useEffect, useState } from "react";
import { sessionContext } from "../../context/Session";
import Text from "../../src/components/Text";
import Secondary from "../../src/components/Secondary";
import Details from "../../src/components/Details";
import Summary from "../../src/components/summary";
import Clients from "../../src/components/Clients";
import ClientForm from "../../src/components/ClientForm";
import Header from "../../src/components/Header";

export default function Clientes() {
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
    if (params !== undefined && userData['clients'] !== undefined) {
        specific = userData['clients'][parseInt(params.replace(':', ''))-1]
    }

    const [  name, setName ] = useState()
    const [  type, setType ] = useState('')
    const [  totalIncome, setTotalIncome ] = useState('')
    let counter = 0

    useEffect(() => {
        setName(specific.name)
        setType(specific.type)
        if (Object.keys(specific).length > 0) {
            specific.details.map((detail, index) => {
                counter += parseInt(detail.product[1]) * parseInt(detail.quantity)
            })
            setTotalIncome(counter)
        }
    }, [specific])

    const [ load, setLoad ] = useState(true)

    const [size, setSize] = useState()
    useState(() => {
        if (typeof window !== 'undefined') {
            setSize(window.screen.availWidth)
        }
    }, [])
    return (
        <Template>
            <Header secondary={true} />
            <Container>
                {!load && Object.keys(specific).length > 0 ?
                <>
                    <Text 
                    backLink={true}
                    top={true}
                    title="Clientes"
                    subtitle="Dê uma atenção especial aos seus clientes. Eles merecem!"
                    />
                    <Secondary>
                        {size && parseInt(size) <= 425 ? 
                        <ClientForm  email={userData.email} specific={specific}/>
                        :
                        ''
                        }
                        <Clients sales={specific.details.length} cost={specific.details[0].date} ticket={totalIncome} client={specific} />
                        <div>
                            <Details.Equipe clients={true} totalIncome={totalIncome} name={name} type={type}/>
                            {size && parseInt(size) <= 425 ? 
                            ''
                            :
                            <ClientForm  email={userData.email} specific={specific}/>
                            }
                        </div>
                    </Secondary>
                </>
                : ''}
            </Container>
        </Template>
    )
}