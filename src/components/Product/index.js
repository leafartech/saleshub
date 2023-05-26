import SimpleTable from '../SimpleTable'
import Summary from '../summary'
import styles from './Product.module.css'

export default function Product({ data, sellers, cost, ticket, sales, details, name}) {
    const thParams = ["Nome", "Vendas", "Comissão"]
    let quantityInfluencer = 0
    let quantitySeller = 0

    if (Object.keys(sellers).length > 0) {
        sellers.map((seller, index) => {
            seller.details.map((sell) => {
                if (sell.product[0] === data.name && seller.type === 'vendedor') {
                    quantitySeller += parseInt(sell.quantity)
                } 
                if (sell.product[0] === data.name && seller.type === 'influencer') {
                    quantityInfluencer += parseInt(sell.quantity)
                } 
            })
        })
    }

    return (
        <div className={ styles.productInfo }>
            <Summary cost={cost} ticket={ticket} sales={sales}/>
            <div className={ styles.report }>
                <div className={ styles.firstDiv }>
                    <div>
                        <h5>Vendedores</h5>
                        <h4>{quantitySeller}</h4>
                    </div>
                    <div>
                        <h5>Influencers</h5>
                        <h4>{quantityInfluencer}</h4>
                    </div>
                </div>
                <div className={ styles.division }>
                    <div></div>
                </div>
                <div>
                    <div>
                        <h5>Preço de venda</h5>
                        <h4>R$ {ticket}</h4>
                    </div>
                    <div>
                        <h5>Custos fixos</h5>
                        <h4>R$ {cost}</h4>
                    </div>
                </div>
            </div>
            <div className={ styles.table }>
                <SimpleTable sellers={sellers} productName={name} thParams={thParams}/>
            </div>
        </div>
    )
}

