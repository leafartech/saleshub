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
                    <ul>
                        <li>Estabeleça um relacionamento confiável: crie uma conexão sólida e genuína com o cliente.</li>
                        <li>Faça perguntas abertas: estimule respostas detalhadas e sinceras do cliente.</li>
                        <li>Mostre interesse e ouça atentamente: demonstre que valoriza a opinião do cliente.</li>
                        <li>Ofereça incentivos: recompense o cliente por compartilhar seu depoimento.</li>
                        <li>Simplifique o processo: facilite e torne conveniente para o cliente compartilhar seu depoimento.</li>
                    </ul>
                </Dropdown>
                <Dropdown favorite={favorite} number="2" title="Analisar Feedack">
                    <ul>
                        <li>Colete feedback de forma abrangente: obtenha opiniões de diferentes canais e pontos de contato.</li>
                        <li>Classifique o feedback por categorias: organize as informações em tópicos relevantes para identificar padrões.</li>
                        <li>Priorize os problemas críticos: identifique os pontos que exigem atenção imediata e resolução.</li>
                        <li>Use métricas e dados quantitativos: utilize números e estatísticas para avaliar o impacto do feedback.</li>
                        <li>Aja de forma proativa: tome medidas concretas para melhorar com base nas necessidades e sugestões dos clientes.</li>
                    </ul>
                </Dropdown>
                <Dropdown favorite={favorite} number="3" title="Construir nova oferta">
                    <ul>
                        <li>Analise o feedback em profundidade: identifique as necessidades e desejos específicos expressos pelos clientes.</li>
                        <li>Identifique oportunidades de melhoria: encontre lacunas ou áreas em que sua oferta atual pode ser aprimorada com base no feedback.</li>
                        <li>Adapte sua proposta de valor: ajuste seu produto ou serviço para atender às demandas e expectativas dos clientes.</li>
                        <li>Introduza recursos ou benefícios adicionais: incorpore elementos solicitados pelos clientes para tornar sua oferta mais atrativa.</li>
                        <li>Realize testes e obtenha feedback adicional: valide suas mudanças com um grupo de clientes para garantir que atendam às suas expectativas.</li>
                    </ul>
                </Dropdown>
                <Dropdown favorite={favorite} number="4" title="Apresentar novo produto">
                    <ul>
                        <li>Identifique as necessidades específicas do cliente: demonstre que você compreende suas preocupações e desejos.</li>
                        <li>Destaque os benefícios chave da nova oferta: explique claramente como ela atende às necessidades do cliente e resolve seus problemas.</li>
                        <li>Utilize casos de sucesso: compartilhe histórias de clientes que se beneficiaram da nova oferta para ilustrar seu valor.</li>
                        <li>Personalize a apresentação: adapte a abordagem de acordo com as preferências e interesses do cliente.</li>
                        <li>Ofereça incentivos especiais: forneça descontos, bônus ou outras vantagens para incentivar a adoção da nova oferta.</li>
                    </ul>
                </Dropdown>
            </div>
        </div>
    )
}