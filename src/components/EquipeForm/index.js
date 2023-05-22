import { useContext, useEffect, useState } from 'react'
import Botao from '../Botao'
import styles from './EquipeForm.module.css'
import Input from '../Input'
import Text from '../Text'
import { useRouter } from 'next/router'
import axios from 'axios'
import { sessionContext } from '../../../context/Session'

export default function EquipeForm({specific, email, changeName}) {
    const session = useContext(sessionContext)

    const router = useRouter()
    var params = router.query.id

    const [ name, setName ] = useState('')
    const [ age, setAge ] = useState('')
    const [ sales, setSales ] = useState('')
    const [ gender, setGender ] = useState('')
    const [ comission, setComission ] = useState('')
    const [ type, setType ] = useState('')
    const [ totalIncome, setTotalIncome ] = useState('')
    const [ form, setForm ] = useState({})

    useEffect(() => {
        setName(specific.name)
        setTotalIncome(specific.totalIncome)
        setType(specific.type)
        setAge(specific.age)
        setSales(specific.sales)
        setGender(specific.gender)
        setComission(specific.comission)
    }, [specific])
    
    const [ exclude, setExclude ] = useState(false)
    const [ error, setError ] = useState(false)

    //ATUALIZA OS CAMPOS DO INPUT
    let cont = 0
    function inptChange(e) {
        const {name, value} = e.target
        
        setError({})
        if (name === 'name') {
            changeName(value)
            setName(value)
        }
        if (name === 'type') setType(value)
        if (name === 'age') setAge(value)
        if (name === 'sales') setSales(value)
        if (name === 'totalIncome') setTotalIncome(value)
        if (name === 'gender') setGender(value)
        if (name === 'comission') setComission(value)

        if (cont == 0) {
            setForm({
                'type': specific.type,
                'name': specific.name,
                'age': specific.age,
                'gender': specific.gender,
                'sales': specific.sales,
                'totalIncome': specific.totalIncome,
                'comission': specific.comission,
            })
            cont++
        }

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
            await axios.post('/api/crud/DELETE', ['sellers', parseInt(params.replace(':', '')) -1, email]).then(res => {
                //ATUALIZAR USUÁRIO NO LOCAL STORAGE
                //RESPONSE RETORNA O USUÁRIO ATUALZIADO
                session.setUser(res.data)
                router.back()
            }).catch(e => console.log(e))
        }
    }

    async function formSubmited(e) {
        e.preventDefault()

        //VERIFICAÇÃO DOS CAMPOS
        if (name === '') return setError({name: true})
        if (type === '') return setError({type: true})
        if (age === '') return setError({age: true})
        if (gender === '') return setError({gender: true})
        if (comission === '') return setError({comission: true})
        if (sales === '') return setError({sales: true})
        if (totalIncome === '') return setError({totalIncome: true})

        const data = [form, ['sellers', parseInt(params.replace(':', '')) -1, email]]

        //URL DA REQUISIÇÃO
        await axios.post('/api/crud/UPDATE', data).then(res => {
            //ATUALIZAR USUÁRIO NO LOCAL STORAGE
            //RESPONSE RETORNA O USUÁRIO ATUALZIADO
            session.setUser(res.data)

        }).catch(e => console.log(e))
    }
    return (
        <form onSubmit={e => formSubmited(e)} className={ styles.form }>
            <Text title="Editar dados"  />
            <div className={ styles.productInpt }>
                <label>Nome</label>
                <Input produto={true} size={true} errorVerify={error["name"] === true ? true : ''} inptChange={e => inptChange(e)} label="Nome" name="name" type="text" value={name}/>
            </div>
            <div className={ styles.productInpt }>
                <label>Tipo</label>
                <Input produto={true} size={true} errorVerify={error["type"] === true ? true : ''} inptChange={e => inptChange(e)} label="Tipo" name="type" type="text" value={type}/>
            </div>
            <div className={ styles.productInpt }>
                <label>Idade</label>
                <Input produto={true} size={true} errorVerify={error["age"] === true ? true : ''} inptChange={e => inptChange(e)} label="Idade" name="age" type="number" value={age}/>
            </div>
            <div className={ styles.productInpt }>
                <label>Gênero</label>
                <Input readonly={true} produto={true} size={true} errorVerify={error["gender"] === true ? true : ''} inptChange={e => inptChange(e)} label="Gênero" name="gender" type="text" value={gender}/>
            </div>
            <div className={ styles.productInpt }>
                <label>Comissão (%)</label>
                <Input produto={true} size={true} errorVerify={error["comission"] === true ? true : ''} inptChange={e => inptChange(e)} label="Comissão" name="comission" type="number" value={comission}/>
            </div>
            <div className={ styles.productInpt }>
                <label>Quantidade de vendas</label>
                <Input readonly={true} produto={true} size={true} errorVerify={error["sales"] === true ? true : ''} inptChange={e => inptChange(e)} label="Quantidade" name="sales" type="number" value={sales} />
            </div>
            <div className={ styles.productInpt }>
                <label>Total faturado</label>
                <Input readonly={true} produto={true} size={true} errorVerify={error["totalIncome"] === true ? true : ''} inptChange={e => inptChange(e)} label="totalIncome" name="totalIncome" type="number" value={totalIncome}/>
            </div>
            
            <div className="flex-2">
                <Botao
                    sm={true}
                    level="2"
                    text="Exluir"
                    type="button"
                    buttonClicked={e => buttonClicked(e)}
                    />
                <Botao 
                    sm={true}
                    level="1"
                    text="salvar"
                    type="submit"
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
    )
}