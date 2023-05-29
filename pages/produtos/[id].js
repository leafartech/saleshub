import { useContext, useEffect, useState } from "react";
import Container from "../../src/components/Container";
import Navbar from "../../src/components/Navbar";
import Secondary from "../../src/components/Secondary";
import Template from "../../src/components/Template";
import Text from "../../src/components/Text";
import { useRouter } from "next/router";
import { sessionContext } from "../../context/Session";
import Details from "../../src/components/Details";
import Product from "../../src/components/Product";
import ProdutForm from "../../src/components/ProductForm";
import Header from "../../src/components/Header";

export default function Produtos() {
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

    
    //GRAVA OS DADOS DA SESSÃO EM userData. ALTERAR CAMPO "PRODUCTS" PARA O ESCOLHIDO
    let specific = {}
    let sellers = {}
    if (params !== undefined && userData['products'] !== undefined) {
        specific = userData['products'][parseInt(params.replace(':', ''))-1]
        sellers = userData['sellers']
    }

    const [ load, setLoad ] = useState(true)

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
                        title="Produtos"
                        subtitle="Tenha um contato mais próximo com o seu produto."
                    />
                    <Secondary> 
                        {size && parseInt(size) <= 425 ? 
                        <ProdutForm product={specific}/>
                        :
                        ''
                        }
                        <Product data={specific} sellers={sellers} name={specific.name} details={specific.details} sales={specific.sales} ticket={specific.sellPrice} cost={specific.costPrice} />
                        <div>
                            <Details.Equipe name={specific.name} totalIncome={specific.sales * specific.sellPrice} produtos={ true } />
                            {size && parseInt(size) <= 425 ? 
                            ''
                            :
                            <ProdutForm product={specific}/>
                            }
                        </div>
                    </Secondary>
                </>
                : ''}
            </Container>
        </Template>
    )
}