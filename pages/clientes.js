import { useContext, useEffect, useState } from "react";
import Container from "../src/components/Container";
import Header from "../src/components/Header";
import Table from "../src/components/Table";
import Template from "../src/components/Template";
import Text from "../src/components/Text";
import { sessionContext } from "../context/Session";

export default function Clientes() {
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])

    const tableParams = {
        thead: ['Cliente', 'Quantidade de compras', 'Total gasto'],
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
                <Text title="Clientes" subtitle="Sem eles não existe negócio. Acho que merecem uma atenção especial, né?" top={true}/>
                {Object.keys(userData).length > 0 ?
                <>
                    <Table tableData={userData["clients"]} url="clientes" tableParams={tableParams} produtos={true} clients={ true } />
                </>
                : ''
                }
                </>
                : ''}
            </Container>
        </Template>
    )
}