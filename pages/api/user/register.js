import clientPromise from '../../../lib/mongodb'

export default async function Register (req, res) {
    try {
        const client = await clientPromise
        const db = client.db("BASEDEDADOS")

        // Verificar se usuário já existe
        const users = await db.collection("saleshub").find({})
        let userExists = false
        let error = ''

        await users.forEach(user => {
            if (user.email === req.body.email) {
                userExists = true
                error = 'Usuário já existe'
            }
        })
        
        if (error.length > 0) {
            return res.send(error)
        }

        const body = {
            ...req.body,
            clients: [],
            sellers: [],
            strategy: [],
            sells: [],
            products: [],
            goal: 0
        }

        await db.collection("saleshub").insertOne({
            ...body
        })

        res.send('success')
    }catch(e) {
        console.log(e)
    }
}