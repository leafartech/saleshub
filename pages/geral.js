import Acts from "../src/components/Acts";
import Container from "../src/components/Container";
import Header from "../src/components/Header";
import Template from "../src/components/Template";
import Text from "../src/components/Text";
import { sessionContext } from "../context/Session";
import { useContext, useEffect, useState } from "react";
import Modal from "../src/components/Modal";
import Card from "../src/components/Card";
import Progress from "../src/components/Progress";
import axios from "axios";

export default function Home() {
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
    }, [])
    const [ current, setCurrent ] = useState(0)
    const [ costs, setCosts ] = useState(0)

    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))

        let totalIncome = 0
        let totalExpense = 0
        JSON.parse(session.getUser()).products.map((product, index) => {
            totalIncome += parseInt(product.sales) * parseInt(product.sellPrice)
            totalExpense += parseInt(product.sales) * parseInt(product.costPrice)
        })

        setCosts(totalExpense)
        setCurrent(totalIncome)
    }, [])

    const [ load, setLoad ] = useState(true)

    useEffect(() => {
        if (Object.keys(userData).length > 0) {
            setLoad(false)
        }
    }, [userData])

    const [ cliente, setCliente ] = useState('')
    const [ product, setProduct ] = useState('')
    const [ seller, setSeller ] = useState('')
    const [ date, setDate ] = useState('')
    const [ quantity, setQuantity ] = useState('')
    const [ form, setForm ] = useState({})
    const [ modal, setModal ] = useState(false)

    const inptObj = [
        ['text', cliente, 'Cliente', 'client'], 
        ['select', product, 'Produto', 'product'], 
        ['select', seller, 'Vendedor', 'seller'],
        ['number', quantity, 'Quantidade', 'quantity'],
        ['date', date, 'Data', 'date'],
    ]

    if (Object.keys(userData).length > 0) {
        inptObj[1].push([...userData["products"]])
        inptObj[2].push([...userData["sellers"]])
    }

    const [ error, setError ] = useState({})
    const [ serverError, setServerError] = useState(false)

    function modalHandler(e) {
        if (modal) {
            setCliente('')
            setDate('')
            setSeller('')
            setQuantity('')
            setForm({})
            setError({})
            setModal(false)
        } else {
            setModal(true)
        }
    }

    function inptChange(e) {
        const {name, value} = e.target

        if (name === 'client') setCliente(value)
        if (name === 'product') setProduct(value)
        if (name === 'seller') setSeller(value)
        if (name === 'quantity') setQuantity(value)
        if (name === 'date') setDate(value)

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    async function formSubmited(e) {
        e.preventDefault()

        setError({})
        if (cliente === '') return setError({client: true})
        if (product === '') return setError({product: true})
        if (!!seller === false || seller === '1') return setError({seller: true})
        if (quantity === '') return setError({quantity: true})
        if (date === '') return setError({date: true})
        
        await axios.post('/api/crud/POST', {...form, "user": userData.email, sell: true}).then(res => {
            if (res.data.error) {
                setServerError(true)
                return
            }
            //EXIBIR MENSAGEM DE SUCESSO DIRETAMENTE NA TELA?
            setServerError(false)
            session.setUser(res.data)

            //RECARREGA DADOS DA TABELA
            setCliente('')
            setProduct('')
            setSeller('')
            setQuantity('')
            setDate('')
            setModal(false)
            setUserData(JSON.parse(session.getUser()))

        }).catch(e => console.log(e))
    }

    return (
        <Template>
            <Header />
            <Container load={load}>
                <Text button={true} buttonText="Nova venda" buttonClicked={e => modalHandler(e)} top={true} title="Que bom que está de volta!" subtitle="O clima de hoje está excelente para vendas, consigo sentir o cheiro de dinheiro. Você também?" colored={true}/>
                <div>
                    <Text title="Para onde gostaria de ir?" small={true}/>
                    <div className={ "flex" }>
                        <Acts path="produtos" text="Produtos" icon="cart"/>
                        <Acts path="estrategias" text="Estratégias" icon="estrategia"/>
                        <Acts path="clientes" text="Clientes" icon="foguete"/>
                        <Acts path="equipe" text="Equipe" icon="vendedores"/>
                    </div>
                </div>
                {load ?
                ''
                :
                <>
                    <div style={{ marginTop: '72px'}}>
                        <Text small={true} title="Confira seus resultados" />
                        <div className={ "flex bottom" }>
                            <Card icon="up" title="Vendas realizadas" main={`${userData["sells"].length} vendas`}/>
                            <Card icon="bank" title="Receita gerada" main={`R$ ${current.toLocaleString('pt-br')}`}/>
                            <Card icon="expense" title="Custos" main={ `R$ ${costs.toLocaleString('pt-br')}` }/>
                            <Card icon="income" title="Lucro total" main={` ${(current - costs).toLocaleString('pt-br')} `}/>
                        </div>
                    </div>
                    <div style={{ marginTop: '72px'}}>
                        <Text small={true} title="Meta de faturamento" />
                        <Progress />
                    </div>
                </>
                }
            </Container>
            <Modal texto="Registrar venda" onSubmitForm={e => formSubmited(e)} generalError={serverError} error={error} inptObj={inptObj} buttonClicked={e => modalHandler(e)} inptChangeModal={e => inptChange(e)} modalState={modal}/>
        </Template>
    )
}