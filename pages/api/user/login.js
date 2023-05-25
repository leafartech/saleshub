import clientPromise from '../../../lib/mongodb'

export default async function Login(req, res) {
    try {
        const client = await clientPromise
        const db = client.db("BASEDEDADOS")
        let error = false

        // Verificar usuário
        let userData = null
        const users = await db.collection("saleshub").find({})
        await users.forEach((user) => {
            if (user.email === req.body.email && user.senha === req.body.senha) {
                error = false
                userData = user
            } else if (userData === null) {
                error = true
            }
        })
        if (error) {
            return res.send('error')
        }
        
        res.send(userData)
    }catch(e) {
        console.log(e)
    }
}