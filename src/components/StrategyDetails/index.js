import axios from 'axios'
import Botao from '../Botao'
import Dropdown from '../Dropdown'
import SimpleTable from '../SimpleTable'
import Text from '../Text'
import styles from './StrategyDetails.module.css'
import { useContext, useEffect, useState } from 'react'
import { sessionContext } from '../../../context/Session'

export default function StrategyDetails({specific, params, email}) {
    const session = useContext(sessionContext)
    const thParams = ['Tarefas', '', 'Prazo']
    const [ tableData, setTableData ] = useState(specific)
    let counter = 0

    function changeTaskStatus(index, person) {
        person[index].complete = !person[index].complete
    }

    useEffect(() => {
        setTableData(specific)
        // console.log('aq')
    }, [specific, counter])

    async function formSubmited(e) {
        e.preventDefault()
        
        const data = [specific, ['strategy', parseInt(params.replace(':', '')) -1, email]]
        //URL DA REQUISIÇÃO
        await axios.post('/api/crud/UPDATE', data).then(res => {
            //ATUALIZAR USUÁRIO NO LOCAL STORAGE
            //RESPONSE RETORNA O USUÁRIO ATUALZIADO
            session.setUser(res.data)

        }).catch(e => console.log(e))
        // console.log(s)
    }
    return (
        <div className={ styles.strategyDetails }>
            <Text title="Pessoas da equipe envolvidas e suas respectivas tarefas" medium={true} />
            <div className={ styles.strategyContent }>
                {console.log(tableData)}
                {tableData['team'].map((person, index) => (
                    <>
                        <Dropdown key={index} id={index} title={person.name} number={`${index+1}`}>
                            <SimpleTable changeTaskStatus={(index, person) => changeTaskStatus(index, person)} strategy={true} sellers={person.task} deadline={person.deadline} thParams={thParams}/>
                        </Dropdown>
                    </>
                ))}
            </div>
            <form onSubmit={e => formSubmited(e)}>
                <Botao type="submit" sm={true} level="1" text="Salvar" buttonClicked={() => {}}/>
            </form>
        </div>
    )
}