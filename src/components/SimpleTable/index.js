import { useEffect, useState } from 'react'
import styles from './SimpleTable.module.css'
import StrategyTd from '../StrategyTd'

export default function SimpleTable({ thParams, productName, sellers, team, client, strategy, changeTaskStatus, deleteTask }) {
    const [tasks, setTasks] = useState({})
    useEffect(() => {
        setTasks(sellers)
    }, [sellers])
    let counter = 0

    function zero() {
        counter = 0
    }

    return (
        <table className={ styles["simple-table"] }>
            <thead>
                {strategy ?
                <tr style={{ gridTemplateColumns: '3fr 10px 1fr' }}>
                    <th>{ thParams[0] }</th>
                    <th>{ thParams[1] }</th>
                    <th className={ styles.responsive }>{ thParams[2] }</th>
                </tr>
                :
                <tr>
                    <th>{ thParams[0] }</th>
                    <th>{ thParams[1] }</th>
                    <th className={ styles.responsive }>{ thParams[2] }</th>
                </tr>
                }
            </thead>
            <tbody>
                { Object.keys(tasks).length > 0 ?
                <>
                    { strategy ?
                    tasks.map((task, index) => (
                        <tr key={index} style={{ gridTemplateColumns: '3fr 10px 1fr' }} id={`tRow-${task.name.replace(' ', '-')}-${index}`}>
                            <StrategyTd changeTaskStatus={index => changeTaskStatus(index, sellers)} task={task} index={index} />
                            <td style={{ width: '10px'}}></td>
                            <td className={ styles.deleteItem }>
                                {(task.deadline).slice(8, 10)} / {(task.deadline).slice(5,7)} / {(task.deadline).slice(0,4)}
                            </td>
                        </tr>
                    ))
                    :
                    <>
                    { client ?
                        Object.values(sellers.details).map((detail, index) => (
                            <tr key={index}>
                                <td>{detail["seller"]}</td>
                                <td>{detail["product"][0]}</td>
                                <td className={ styles.responsive }>{detail["date"].slice(8, 10)} / {detail["date"].slice(5, 7)} / {detail["date"].slice(0, 4)}</td>
                            </tr>
                        ))
                    : 
                        <>
                            {team ?
                            Object.values(sellers.details).reverse().map((seller, index) => (
                                <tr key={index}>
                                    <td>{seller.product[0]}</td>
                                    {zero()}
                                    <td>{seller.quantity}</td>
                                    <td className={ styles.responsive }>
                                        {(seller.date).slice(8, 10)} / {(seller.date).slice(5,7)} / {(seller.date).slice(0,4)}
                                    </td>
                                </tr>
                            ))
                            : 
                            <>
                            {sellers.map((seller, index) => (
                                <tr key={index}>
                                    <td>{seller.name}</td>
                                    {zero()}
                                    {seller.details.map((detail, index2) => {
                                        if (detail.product[0] === productName) {
                                            counter++
                                        }
                                    })}
                                    <td>{counter}</td>
                                    <td className={ styles.responsive }>{seller.comission}%</td>
                                </tr>
                            ))}
                            </>
                            }
                        </>
                    }
                    </>
                    }
                </>
                : ''}
            </tbody>
        </table>
    )
}