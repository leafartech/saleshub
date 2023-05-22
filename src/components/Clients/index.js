import { useEffect, useState } from 'react'
import Summary from '../summary'
import styles from './Clients.module.css'
import Text from '../Text'
import Dropdown from '../Dropdown'
import SimpleTable from '../SimpleTable'

export default function Clients({sales, cost, ticket, client}) {
    const [ favorite, setFavorite ] = useState('')
    let times = []

    const thParams = ["Vendedor", "Produto", "Data"]

    //FAZER LÓGICA PARA PRODUTO PREFERIDO DO CLIENTE

    useEffect(() => {
        client.details.map((detail, index) => {
            times.push(detail.product[0])
        })

        let frequencia = {}
        let counter = 0
        
        for (let p in times) {
            if (typeof frequencia[times[p]] === 'number') {
                counter = frequencia[times[p]] + 1
                frequencia[times[p]] = counter
            } else {
                frequencia[times[p]] = 1
            }
        }
        const entries = Object.entries(frequencia)
        let favoriteHlp = ['', 0]
        for (let p in entries) {
            if (entries[p][1] > favoriteHlp[1]) {
                favoriteHlp = [entries[p][0], entries[p][1]]
            }
        }
        setFavorite(favoriteHlp)
    }, [])

    return (
        <div className={ styles.clientInfo }>
            <Summary sales={sales} cost={cost} ticket={ticket} clients={true}/>
            <div className={ styles.report }>
                <div className={ styles.firstDiv }>
                    <div>
                        <h5>Primeira compra</h5>
                        <h4>{client.firstBuy.slice(8, 10)} / {client.firstBuy.slice(5, 7)} / {client.firstBuy.slice(0, 4)}</h4>
                    </div>
                    <div>
                        <h5>Última compra</h5>
                        <h4>{cost.slice(8, 10)} / {cost.slice(5, 7)} / {cost.slice(0, 4)}</h4>
                    </div>
                </div>
                <div className={ styles.division }>
                    <div></div>
                </div>
                <div>
                    <div>
                        <h5>Produto favorito</h5>
                        <h4>{favorite[0]}</h4>
                    </div>
                    <div>
                        <h5>Quantidade de compras</h5>
                        <h4>{favorite[1]}</h4>
                    </div>
                </div>
            </div>
            <SimpleTable client={true} sellers={client} thParams={thParams} productName={client.name} />
            <div className={ styles.suggest }>
                <Text top={true} medium={true} title="Sugestões" subtitle="Trabalhe ofertas para pessoas que já compraram anteriormente com você e venda novamente para elas."/>
                <Dropdown favorite={favorite} number="1" title="Recolher depoimento">
                    {/* como foi a experiência de compra, se demorou para chegar, se a caixa chegou amassada ou danificada */}
                    <p>Pergunte ao cliente como está sendo a experiência com o produto favorito dele ({favorite[0]}).</p>
                    <p>Durante todo o processo é importante criar conexões com o cliente para que ele goste de você e seja o mais verdadeiro possível na hora de relatar a experiência.</p>
                    <p>Então, é necessário tratá-lo(a) muito bem. Como fazer isso?</p>
                    <ul>
                        <li>Se apresente</li>
                        <li>Agradeça</li>
                        <li>Faça perguntas</li>
                    </ul>
                </Dropdown>
                <Dropdown favorite={favorite} number="2" title="Analisar Feedack">
                    <p>Essa parte é importantíssima nesse processo.</p>
                    <p>Se você não entender o que o seu cliente realmente quer e o que pode melhorar no seu produto, você não vai conseguir construir uma oferta ainda melhor para ele.</p>
                    <p>Por isso, gaste o tempo que for necessário analisando a conversa e desenvolvendo possibilidades de novas ofertas.</p>
                </Dropdown>
                <Dropdown favorite={favorite} number="3" title="Construir nova oferta">
                    <p>Essa parte é importantíssima nesse processo.</p>
                </Dropdown>
                <Dropdown favorite={favorite} number="4" title="Apresentar novo produto">
                    <p>Essa parte é importantíssima nesse processo.</p>
                </Dropdown>
            </div>
        </div>
    )
}