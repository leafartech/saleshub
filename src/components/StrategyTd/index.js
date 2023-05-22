import { useState } from 'react'
import styles from './StrategyTd.module.css'

export default function StrategyTd({ task, index, changeTaskStatus }) {
    const [ taskStatus, setTaskStatus ] = useState(task.complete)
    const [ taskUncomplete, setTaskUncomplete ] = useState(false)

    function completeTask(e) {
        setTaskUncomplete(false)
        if (taskStatus === true) {
            setTaskUncomplete(true)
            setTimeout(() => {
                setTaskUncomplete(false)
            }, "800")
        }
        setTaskStatus(!taskStatus)
        changeTaskStatus(index)
    }

    return (
        <td className={ styles.taskName }>
            <button className={ `${taskStatus ? styles.completed : ''} ${styles.completeTask}` } id={ task.complete ? '1' : '0'} onClick={ e => completeTask(e) }>
                {/* {taskStatus()} */}
            </button>
            <span className={ `${taskStatus ? styles.completed : ''} ${taskUncomplete ? styles.uncomplete : ''}`}>{task.name}</span>
            {/* {task.details} */}
        </td>
    )
}