import { useContext, useEffect, useState } from 'react'
import styles from './Table.module.css'
import Link from 'next/link'
import Botao from '../Botao'
import { tableContext } from '../../../context/Table'

export default function Table({tableParams, tableData, url, produtos, clients, strategy}) {
    const [ data, setData ] = useState([])
    const TableContext = useContext(tableContext)

    const { layout, setLayout } = TableContext
    useEffect(() => {
        setData(tableData)
    }, [tableData])
    
    
    function changeLayout(e) {
        setLayout(e.target.id)
    }

    let counter = 0
    function zero() {
        counter = 0
    }

    function search(e) {
        const { name, value } = e.target

        const searchData = []
        if (value) {
            searchData.push(...tableData.filter((current, index) => current.name.toLowerCase().includes(value.toLowerCase())))
            setData(searchData)
            console.log(searchData)
        } else {
            setData(tableData)
        }
        
    }

    return (
        <div className={ styles.myTable }>
            <div className={ styles.tableHead}>
                <form>
                    <svg className={ styles.searchSvg } xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/></svg>
                    <input type="search" name="search" id="" placeholder="Faça uma busca" onChange={e => search(e)} />
                </form>
                <div className={ styles.view }>
                    <button id="card" onClick={e => changeLayout(e)} type='button' className={`${layout === 'card' ? styles.active : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="card" viewBox="0 0 24 24" width="512" height="512">
                            <path id="card" d="M2,11H13a2,2,0,0,0,2-2V2a2,2,0,0,0-2-2H2A2,2,0,0,0,0,2V9A2,2,0,0,0,2,11ZM2,2H13V9H2Z"/>
                            <path id="card" d="M22,0H19a2,2,0,0,0-2,2V9a2,2,0,0,0,2,2h3a2,2,0,0,0,2-2V2A2,2,0,0,0,22,0Zm0,9H19V2h3Z"/>
                            <path id="card" d="M5,13H2a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H5a2,2,0,0,0,2-2V15A2,2,0,0,0,5,13Zm0,9H2V15H5Z"/>
                            <path id="card" d="M22,13H11a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V15A2,2,0,0,0,22,13Zm0,9H11V15H22Z"/>
                        </svg>
                    </button>
                    <button id="list" onClick={e => changeLayout(e)} type='button' className={` ${layout === 'list' ? styles.active : ''} `}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="list" viewBox="0 0 24 24" width="512" height="512">
                            <path id="list" d="M7,6H23a1,1,0,0,0,0-2H7A1,1,0,0,0,7,6Z"/><path d="M23,11H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/>
                            <path id="list" d="M23,18H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/>
                            <circle id="list" cx="2" cy="5" r="2"/>
                            <circle id="list" cx="2" cy="12" r="2"/>
                            <circle id="list" cx="2" cy="19" r="2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={ styles.tableBody }>
                {layout === 'list' ?      
                    <table>
                        <thead>
                            <tr>
                                {tableParams['thead'].map((th, index) => (
                                    <th className={index === 1 ? styles.responsive : ''} key={index}>{th}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            { data.length > 0 ?
                            data.map((person, index) => (
                                <tr key={index} className={ index === data.length-1 ? styles.lastTr : '' }>
                                    {/* FAZER VERIFICAÇÕES PARA CADA CASO */}
                                    <td style={{ textTransform: 'capitalize' }}>
                                        {person.name}
                                        {produtos || strategy ?
                                        ''
                                        : 
                                        <span className={ ` ${person.type === 'influencer' ? styles.influencer : '' } ${styles.type }`}>{person.type}</span>
                                        }
                                    </td>
                                    {strategy ?
                                    person.team.length >= 0 && person.team.length != 1 ?
                                    <td className={ styles.responsive }>{person.team.length} pessoas</td>
                                    :
                                    <>
                                    <td className={ styles.responsive }>{person.team.length} pessoa</td>
                                    </>
                                    :
                                    <>
                                    {person.sales === 0 ?
                                    <td className={ styles.responsive}>{person.sales} vendas</td>
                                    :
                                        <>
                                            {clients ?
                                            <td className={ styles.responsive}>{person.details.length}</td>
                                            :
                                            <>
                                                {person.sales > 1 ?
                                                <td className={ styles.responsive}>{person.sales} vendas</td>
                                                : 
                                                <td className={ styles.responsive}>{person.sales} venda</td>
                                                }
                                            </>
                                            }
                                        </>
                                    }
                                    </>
                                    }
                                    <td className={ styles.last }>
                                        {strategy ?
                                        <>
                                            {person.data.slice(8, 10)} / {person.data.slice(5, 7)} / {(person.data).slice(0, 4)}
                                            <Link href={`/${url}/:${index + 1}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"/></svg>
                                            </Link> 
                                        </>
                                        :
                                        <>
                                        {clients ?
                                            <>
                                                {zero()}
                                                {person.details.map((detail, index) => {
                                                    <>
                                                        {counter += parseInt(detail.product[1]) * parseInt(detail.quantity)}
                                                    </>    
                                                })}
                                                R$ {(counter).toLocaleString('pt-br')}
                                                <Link href={`/${url}/:${index + 1}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"/></svg>
                                                </Link>  
                                            </>
                                        :
                                        <>
                                            {produtos ?
                                            <>R$ {person.sales * person.sellPrice}</>
                                            : 
                                            <>R$ {person.totalIncome}</>
                                            }
                                            <Link href={`/${url}/:${index + 1}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"/></svg>
                                            </Link>    
                                        </>
                                        }
                                        </>
                                        }
                                    </td>

                                </tr>
                            ))
                            
                            : ''}
                        </tbody>
                    </table>
                :
                <div className={ styles.masonry }>
                    { data.length > 0 ?
                        data.map((person, index) => (
                            <div key={index} className={ styles["masonry-card"] }>
                                <h3 style={{ textTransform: 'capitalize' }}>{person.name}</h3>
                                <div className={ styles["masonry-head"] }>
                                    <div>
                                        <h6>{tableParams['thead'][1]}</h6>
                                        {strategy ?
                                            <h5>{person.team.length}</h5>
                                        :
                                        <>
                                        {clients ?
                                            <>
                                            <h5>{person.details.length}</h5>
                                            </>
                                        :
                                            <>
                                            {person.sales === 0 ?
                                            <h5>{person.sales} vendas</h5>
                                            : 
                                            <>
                                                {person.sales > 1 ?
                                                <h5>{person.sales} vendas</h5>
                                                :
                                                <h5>{person.sales} venda</h5>
                                                }
                                            </>
                                            }
                                            </>
                                        }
                                        </>
                                        }
                                    </div>
                                    <div>
                                        {strategy ?
                                            <>
                                                <h6>Prazo</h6>
                                                <h5>{person.data.slice(8, 10)}/{person.data.slice(5, 7)}/{person.data.slice(0, 4)}</h5>
                                            </>
                                        :
                                        <>
                                        {clients ?
                                            <>
                                                <h6>Primeira compra</h6>
                                                <h5>{person.firstBuy.slice(8, 10)}/{person.firstBuy.slice(5, 7)}/{person.firstBuy.slice(0, 4)}</h5>
                                            </>
                                        :
                                            <>
                                            {produtos ?
                                            <>
                                                <h6>Ticket</h6>
                                                <h5>R$ {person.sellPrice}</h5>
                                            </>
                                            :
                                            <>
                                                <h6>Comissão</h6>
                                                <h5>{person.comission}%</h5>
                                            </>
                                            }
                                            </>
                                        }
                                        </>
                                        }
                                    </div>
                                </div>
                                <div className={ styles["masonry-body"] }>
                                    <div className={ styles.svg}>
                                        {strategy ?
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M19,18h-.394a25.306,25.306,0,0,1-2.531-8H17a1,1,0,0,0,0-2h-.392S17.7,6.318,17.715,6.277A3,3,0,0,0,15,2H13V1a1,1,0,0,0-2,0V2H9A3,3,0,0,0,6.288,6.277C6.307,6.318,7.4,8,7.4,8H7a1,1,0,0,0,0,2h.926a25.327,25.327,0,0,1-2.532,8H5a3,3,0,0,0,0,6H19a3,3,0,0,0,0-6ZM8.075,5.374A1,1,0,0,1,9,4h6a1,1,0,0,1,.928,1.374L14.224,8H9.779ZM9.935,10h4.13a25.75,25.75,0,0,0,2.318,8H7.617A25.75,25.75,0,0,0,9.935,10ZM19,22H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z"/></svg>
                                        :
                                        <>
                                        {clients ?
                                        <svg id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m20 8a8 8 0 1 0 -14 5.274v8.226a2.5 2.5 0 0 0 4.062 1.952l1.938-1.552 1.938 1.55a2.5 2.5 0 0 0 4.062-1.95v-8.226a7.957 7.957 0 0 0 2-5.274zm-8-6a6 6 0 1 1 -6 6 6.006 6.006 0 0 1 6-6zm3.717 19.948a.491.491 0 0 1 -.529-.06l-3.188-2.551-3.187 2.551a.5.5 0 0 1 -.813-.388v-6.582a7.935 7.935 0 0 0 8 0v6.582a.487.487 0 0 1 -.283.448z"/></svg>
                                        :
                                        <>
                                        {produtos ?
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M9,14h6a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/><path d="M19,0H5A5.006,5.006,0,0,0,0,5V6A3,3,0,0,0,1,8.234V19a5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5V8.234A3,3,0,0,0,24,6V5A5.006,5.006,0,0,0,19,0ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V6a1,1,0,0,1-1,1H3A1,1,0,0,1,2,6ZM21,19a3,3,0,0,1-3,3H6a3,3,0,0,1-3-3V9H21Z"/></svg>  
                                        : 
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
                                        }
                                        </>
                                        }
                                        </>
                                        }
                                    </div>
                                    <div className={ styles.details }>
                                        {strategy ?
                                        <>
                                        <h6>Produto associado</h6>
                                        <h5 style={{ color: 'var(--dark-main1)' }}>{person.product.split(',')[0]}</h5>
                                        </>
                                        :
                                        <>
                                        <h6>{tableParams['thead'][2]}</h6>
                                        {clients ?
                                        <>
                                        {zero()}
                                            {person.details.map((detail, index) => {
                                                <>
                                                    {counter += parseInt(detail.product[1]) * parseInt(detail.quantity)}
                                                </>    
                                            })}
                                            <h5>R$ {(counter).toLocaleString('pt-br')}</h5>
                                        </>
                                        : 
                                            <>
                                            {produtos ?
                                            <h5>R$ {person.sales * person.sellPrice}</h5>
                                            : 
                                            <h5>R$ {person.totalIncome}</h5>
                                            }
                                            </>
                                        }
                                        </>
                                        }
                                    </div>
                                    {/* <div className={ `${person.type === 'influencer' ? styles.influencer : ''} ${styles.type}` }>
                                        {person.type}
                                    </div> */}
                                </div>
                                <Botao buttonClicked={() => {}} action={'link'} level={'1'} href={`/${url}/:${index + 1}`} text="Visualizar"/>
                            </div>
                        ))
                    : ''}
                </div>
                } 
            </div>
        </div>
    )
}