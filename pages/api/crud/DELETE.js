import clientPromise from "../../../lib/mongodb"

export default async function POST(req, res) {
    try {
        const client = await clientPromise
        const db = client.db("BASEDEDADOS")
        let error = false
        const key = req.body[0]
        const dataToDelete = req.body[1]
        const user = req.body[2]
        let userData = null

        await db.collection('saleshub').find({email: user}).forEach(user => userData = user)
        
        userData[key].splice(dataToDelete, 1)

        console.log(userData)
        await db.collection('saleshub').findOneAndUpdate({email: user}, {
            $set: {
                [key]: userData[key]
            }
        })

        res.send(userData)
    }catch(e) {
        console.log(e)
    }
}