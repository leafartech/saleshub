import { useEffect, useState } from 'react'
import SimpleTable from '../SimpleTable'
import Text from '../Text'
import Summary from '../summary'
import styles from './Equipe.module.css'

export default function Team({ thParams, productName, sellers, team, specific }) {
    const [ totalProfit, setTotalProfit ] = useState()
    useEffect(() => {
        let totalProfitHlp = 0
        if (sellers.details) {
            sellers.details.map((seller) => {
                if (specific.type !== 'influencer') {
                    totalProfitHlp += ( parseInt(seller.product[1]) - parseInt(seller.product[2]) ) * parseInt(seller.quantity)
                } else {
                    totalProfitHlp += ( parseInt(seller.product[1]) ) * parseInt(seller.quantity)
                }
            })
            setTotalProfit(totalProfitHlp)
        }
    }, [sellers])

    return (
        <div className={ styles.teamDiv }>
            <Summary team={true} sales={specific.sales} ticket={specific.totalIncome} part={totalProfit} cost={specific.comission}/>
            <div className={ styles.team }>
                <Text small={true} title="Detalhes"/>
                <SimpleTable team={true} sellers={specific} thParams={thParams} productName={specific.name} />
            </div>
        </div>
    )
}