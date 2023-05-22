import clientPromise from "../../../lib/mongodb"

export default async function POST(req, res) {
    try {
        if (Object.keys(req.body).length === 0) return

        const client = await clientPromise
        const db = client.db("BASEDEDADOS")
        let error = false
        const key = req.body[1][0]
        const dataToUpdate = req.body[1][1]
        const user = req.body[1][2]

        let userData = null

        await db.collection('saleshub').find({email: user}).forEach(user => {
            userData = user
        })

        let sellerDetails = userData[key][dataToUpdate].details
        if (key === 'strategy') {
            userData[key][dataToUpdate] = {
                ...req.body[0],
            }
        } else {
            userData[key][dataToUpdate] = {
                ...req.body[0],
                details: sellerDetails
            }
        }

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