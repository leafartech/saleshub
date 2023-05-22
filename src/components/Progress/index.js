import Text from '@/components/Text'
import styles from './Progress.module.css'
import Input from '../Input'
import { useContext, useEffect, useState } from 'react'
import Botao from '../Botao'
import { sessionContext } from '../../../context/Session'
import axios from 'axios'

export default function Progress() {
    const session = useContext(sessionContext)
    const [ userData, setUserData ] = useState({})

    const [ current, setCurrent] = useState(0)
    const [ goal, setGoal ] = useState(0)
    const [ error, setError ] = useState(false)
    const [ change, setChange ] = useState(false)
    const [ percentage, setPercentage ] = useState(0)
    
    useEffect(() => {
        setUserData(JSON.parse(session.getUser()))
        setGoal(JSON.parse(session.getUser()).goal)

        let totalIncome = 0
        JSON.parse(session.getUser()).products.map((product, index) => {
            totalIncome += parseInt(product.sales) * parseInt(product.sellPrice)
        })

        setCurrent(totalIncome)
    }, [])
    
    useEffect(() => {
        setPercentage((parseInt(current) * 100) / parseInt(goal) || 0)
    }, [current])
    

    function inptChange(e) {
        const { name, value } = e.target

        if (name === 'goal') setGoal(value)
    }

    async function formSubmited(e) {
        e.preventDefault()

        if (goal === '') return setError({goal: true})

        await axios.post('/api/crud/POST', {goal, "user": userData.email, "goalVerify": true}).then((res) => {
            if (res.data.error) {
                setServerError(true)
                return
            }

            setPercentage((current * 100) / goal)
            session.setUser(res.data)
        }).catch(e => console.log(e))
    }

    function changeGoal() {
        setChange(!change)
    }

    return (
        <div className={ `${styles["dark-progress"]} ${styles.progress}` }>
            <Text title="Progresso" small={true}/>
            <div className={ `${styles.bar}` }>
                {parseInt(percentage) >= 100 ?
                <div style={{ width: `100%`}}></div>
                : 
                <div style={{ width: `${percentage}%`}}></div>
                }
            </div>
            <div className={ styles.values }>
                {parseInt(percentage) >= 100 ?
                <span>+{100}%</span>
                :
                // percentage ?
                <>
                {/* {console.log(percentage, percentage == false)} */}
                {/* <span>{console.log(percentage == 'NaN' || percentage <= 100)}%</span> */}
                <span>{(percentage).toFixed(0)}%</span>
                </>
                // : 
                
                }
                <span>R${(goal).toLocaleString('pt-br')}</span>
            </div>
            {change ?
            <form className={ styles.goalTop } onSubmit={e => formSubmited(e)}>
                <Input errorVerify={error} inptChange={e => inptChange(e)} label="Meta" name="goal" value={goal}  type="number" inptSm={true}/>
                <Botao inptSm={true} sm={true} level={3} text="Atualizar" outline={true} buttonClicked={()=> {}}/>
            </form>
            :
            <div className={ styles.goalTop }>
                <Botao inptSm={true} sm={true} level={3} text="Alterar" outline={true} buttonClicked={e => changeGoal(e)}/>
            </div>
            }
        </div>
    )
}