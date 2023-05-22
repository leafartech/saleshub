import clientPromise from "../../../lib/mongodb"

export default async function POST(req, res) {
    if (req.body.strategyTask) {
        try {
            const client = await clientPromise
            const db = client.db("BASEDEDADOS")
            let error = false

            const user = req.body.user
            let person = null

            //Verificação se já existe esse vendedor
            const clientData = await db.collection('saleshub').find({email: user})
            await clientData.forEach(clientArray => {
                person = clientArray
            })
            
            if (error) return res.send({error: true})

            const strategy = person["strategy"]

            let verify = false
            let teamIndex = 0
            strategy[parseInt(req.body.params)-1]['team'].map((current, index) => {
                if (current.name === req.body.person) {
                    verify = true
                    teamIndex = index
                }
            })
            if (verify) {
                strategy[parseInt(req.body.params)-1]['team'][teamIndex].task.unshift({
                    name: req.body.task,
                    details: req.body.details,
                    deadline: req.body.deadline,
                    complete: false
                })
            } else {
                strategy[parseInt(req.body.params)-1]['team'].unshift({
                    name: req.body.person,
                    task: [{
                        name: req.body.task,
                        details: req.body.details,
                        deadline: req.body.deadline,
                        complete: false,
                    }],
                })
            }

            await db.collection('saleshub').findOneAndUpdate({email: user}, {
                $set: {
                   "strategy": strategy
                }
            })
    
            person['strategy'] = strategy
    
            res.send(person)
        }catch(e) {
            console.log(e)
        }
        return
    }
    if (req.body.strategy) {
        try {
            const client = await clientPromise
            const db = client.db("BASEDEDADOS")
            let error = false

            const user = req.body.user
            let person = null

            //Verificação se já existe esse vendedor
            const clientData = await db.collection('saleshub').find({email: user})
            await clientData.forEach(clientArray => {
                person = clientArray
            })
            
            if (error) return res.send({error: true})

            const strategy = person["strategy"]

            strategy.unshift({
                name: req.body.name,
                product: req.body.product,
                goal: req.body.goal,
                description: req.body.description,
                data: req.body.data,
                team: [],
                results: ''
            })

            await db.collection('saleshub').findOneAndUpdate({email: user}, {
                $set: {
                   "strategy": strategy
                }
            })
    
            person['strategy'] = strategy
    
            res.send(person)
        }catch(e) {
            console.log(e)
        }
        return
    }
    if (req.body.goalVerify) {
        try {
            const client = await clientPromise
            const db = client.db("BASEDEDADOS")
            let error = false
    
            const user = req.body.user
            let person = null

            const clientData = await db.collection('saleshub').find({email: user})
            await clientData.forEach(clientArray => {
                person = clientArray
            })

            if (error) return res.send({error: true})

            person["goal"] = parseInt(req.body.goal)

            await db.collection('saleshub').findOneAndUpdate({email: user}, {
                $set: {
                    "goal": parseInt(req.body.goal)
                }
            })

            res.send(person)
            
        }catch(e) {
            console.log(e)
        }
        return
    }
    if (req.body.sell) {
        try {
            const client = await clientPromise
            const db = client.db("BASEDEDADOS")
            let error = false
    
            const user = req.body.user
            let person = null
    
            //Verificação se já existe esse vendedor
            const clientData = await db.collection('saleshub').find({email: user})
            await clientData.forEach(clientArray => {
                person = clientArray
            })
            
            if (error) return res.send({error: true})

            const sells = person["sells"]
            const sellers = person["sellers"]
            const products = person["products"]
            const clients = person["clients"]
            // const clients = person["clients"] 
            //PARA CLIENTE: FAZER VERIFICAÇÃO - SE JÁ EXISTE ATUALIZA A QUANTIDADE DE COMPRAS E SE NÃO EXISTIR CRIA NOVO CLIENTE
            //CAMPOS: NOME, DATA, DETAILS: {PRODUTO, QUANTIDADE}
            const sellValues = req.body.product.split(',')
            //NOME DO PRODUTO, VALOR DO PRODUTO

            const toAddInSells = {
                client: req.body.client,
                product: [sellValues[0], sellValues[1]],
                seller: req.body.seller,
                quantity: req.body.quantity,
                date: req.body.date
            }

            sells.unshift(toAddInSells)

            sellers.map((seller, index) => {
                if (seller.name === req.body.seller) {
                    seller["sales"] = parseInt(seller["sales"]) + parseInt(req.body.quantity)
                    seller["details"] = [...seller["details"], {
                        product: [sellValues[0], sellValues[1], sellValues[2]],
                        quantity: req.body.quantity,
                        date: req.body.date
                    }]
                    seller["totalIncome"] = parseInt(seller["totalIncome"]) + (parseInt(req.body.quantity) * parseInt(sellValues[1]))
                }
            })

            products.map((product, index) => {
                if (product.name === sellValues[0]) {
                    product["sales"] = parseInt(product["sales"]) + parseInt(req.body.quantity)
                    product["details"] = [...product["details"], {
                        seller: req.body.seller,
                        quantity: req.body.quantity,
                        date: req.body.date,
                    }]
                }
            })

            //NOME, DETAILS (PRODUTO, DATA)
            let clientExist = [false]
            clients.map((client, index) => {
                if (client.name === req.body.client) {
                    clientExist[0] = true
                    clientExist.push(index)
                }   
            })
            
            const toAddInClients = {
                name: req.body.client,
                firstBuy: req.body.date,
                details: [{
                    product: [sellValues[0], sellValues[1]],
                    quantity: req.body.quantity,
                    date: req.body.date,
                    seller: req.body.seller
                }]
            }

            if (clientExist[0] === true) {
                clients[clientExist[1]].details.unshift({
                    product: [sellValues[0], sellValues[1]],
                    quantity: req.body.quantity,
                    date: req.body.date,
                    seller: req.body.seller
                })
            } else {
                clients.unshift(toAddInClients)
            }
            
            await db.collection('saleshub').findOneAndUpdate({email: user}, { $set: { "sellers": sellers }})
            await db.collection('saleshub').findOneAndUpdate({email: user}, { $set: { "products": products }})
            await db.collection('saleshub').findOneAndUpdate({email: user}, { $set: { "sells": sells }})
            await db.collection('saleshub').findOneAndUpdate({email: user}, { $set: { "clients": clients}})

            person["sellers"] = sellers
            person["sells"] = sells
            person["products"] = products
            person["clients"] = clients

            res.send(person)
        } catch(e) {
            console.log(e)
        }

        return
    }
    if (req.body.product) {
        try {
            const client = await clientPromise
            const db = client.db("BASEDEDADOS")
            let error = false

            const user = req.body.user
            let person = null

            //Verificação se já existe esse vendedor
            const clientData = await db.collection('saleshub').find({email: user})
            await clientData.forEach(clientArray => {
                person = clientArray
            })
            
            if (error) return res.send({error: true})

            const products = person["products"]

            products.unshift({
                name: req.body.name,
                costPrice: req.body.costPrice,
                sellPrice: req.body.sellPrice,
                sales: 0,
                details: []
            })

            await db.collection('saleshub').findOneAndUpdate({email: user}, {
                $set: {
                   "products": products
                }
            })
    
            person['products'] = products
    
            res.send(person)
        }catch(e) {
            console.log(e)
        }
        return
    }
    try {
        const client = await clientPromise
        const db = client.db("BASEDEDADOS")
        let error = false

        const user = req.body.user.email
        let person = null

        //Verificação se já existe esse vendedor
        const clientData = await db.collection('saleshub').find({email: user})
        await clientData.forEach(clientArray => {
            if (clientArray.sellers.length > 0) {
                clientArray.sellers.map(seller => {
                    if (seller.name === req.body.name) error = true
                })
            }
            person = clientArray
        })
        
        if (error) return res.send({error: true})
        
        const sellers = person.sellers

        sellers.unshift({
            type: req.body.type,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            sales: 0,
            totalIncome: 0,
            details: [],
            comission: req.body.comission
        })
        
        await db.collection('saleshub').findOneAndUpdate({email: user}, {
            $set: {
               "sellers": sellers 
            }
        })

        person['sellers'] = sellers

        res.send(person)
    }catch(e) {
        console.log(e)
    }
}