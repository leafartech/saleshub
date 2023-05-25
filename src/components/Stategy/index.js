import { useContext, useState } from 'react'
import StrategyDetails from '../StrategyDetails'
import Text from '../Text'
import Summary from '../summary'
import styles from './Strategy.module.css'
import Input from '../Input'
import Botao from '../Botao'
import axios from 'axios'
import { sessionContext } from '../../../context/Session'

export default function Strategy({ specific, email, params }) {
    //PRECISA PODER CADASTRAR + DE 1 TAREFA POR PESSOA
    //ARRAY DENTRO DAS PESSOAS ENVOLVIDAS COM AS TAREFAS DA PESSOA
    //TASK: []
    const session = useContext(sessionContext)

    const [ error, setError ] = useState({...specific})
    const [ form, setForm ] = useState({...specific})

    const [ description, setDescription ] = useState(specific.description)
    const [ goal, setGoal ] = useState(specific.goal)
    const [ results, setResults ] = useState(specific.results)

    function inptChange(e) {
        const { name, value } = e.target

        if (name === 'description') setDescription(value)
        if (name === 'goal') setGoal(value)
        if (name === 'results') setResults(value)

        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    async function formSubmited(e) {
        e.preventDefault()

        //VERIFICAÇÃO DOS CAMPOS
        if (description === '') return setError({name: true})
        if (goal === '') return setError({goal: true})

        const dataInfo = [form, ['strategy', parseInt(params.replace(':', '')) -1, email]]
        //URL DA REQUISIÇÃO
        await axios.post('/api/crud/UPDATE', dataInfo).then(res => {
            //ATUALIZAR USUÁRIO NO LOCAL STORAGE
            //RESPONSE RETORNA O USUÁRIO ATUALZIADO
            session.setUser(res.data)

        }).catch(e => console.log(e))
    }

    function calcTasks() {
        let total = 0
        let concludes = 0
        specific.team.map((person) => {
            total += person.task.length
            person.task.map(task => {
                if (task.complete) {
                    concludes++
                }
            })
        })

        return [total, concludes]
    }

    return (
        <div className={ styles.strategy }>
            <Summary strategy={true} sales={specific.data} ticket={specific.team.length} cost={calcTasks()}/>
            <div className={ styles.report }>
                <div className={ styles.firstDiv }>
                    <div>
                        <h5>Produto associado</h5>
                    </div>
                    <div>
                        <h4>{specific.product.split(',')[0]}</h4>
                    </div>
                </div>
                <div className={ styles.division }>
                    <div></div>
                </div>
                <div>
                    <div>
                        <h5>Ticket do produto</h5>
                    </div>
                    <div>
                        <h4>R$ {specific.product.split(',')[1]}</h4>
                    </div>
                </div>
            </div>
            <form className={ styles.details } onSubmit={e => formSubmited(e)}>
                <Text medium={true} title="Sobre a estratégia"/>
                <div className={ styles['details-p']}>
                    <h5>Descrição</h5>
                    <p>*Detalhes do que foi feito e como foi feito.</p>
                    <textarea name="description" rows="5" value={description} onChange={e => inptChange(e)}></textarea>
                </div>
                <div className={ styles['details-p']}>
                    <h5>Objetivo</h5>
                    <p>*O que você e sua equipe buscaram com essa abordagem?</p>
                    <Input produto={true} size={true} errorVerify={error["goal"] === true ? true : ''} inptChange={e => inptChange(e)} label="Objetivo" name="goal" type="text" value={goal}/>
                </div>
                <div className={ styles['details-p']}>
                    <h5>Resultados</h5>
                    <p>*Quebre linhas para visualizar mais facilmente os resultados.</p>
                    <textarea name="results" rows="5" value={results} onChange={e => inptChange(e)}></textarea>
                </div>
                <div className={ styles.btn }>
                    <Botao sm={true} text="Salvar" type="submit" level="1" buttonClicked={() => {}}/>
                </div>
            </form>
            <StrategyDetails email={email} params={params} specific={specific}/>
        </div> 
    )
}