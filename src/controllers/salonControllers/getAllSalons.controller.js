import {getAllSalonsFromDB} from "../../models/salon.models.js"


async function getAllSalons(req, res) {
     const dbResultAllSalonsDatas = await getAllSalonsFromDB()

     res.status(200).send(dbResultAllSalonsDatas)

}

export default getAllSalons