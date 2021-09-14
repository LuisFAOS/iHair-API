import { Request, Response } from "express"
import Salon from "../../models/salon.models"


async function getAllSalons(req: Request, res: Response) {
     const _db_salon = await Salon.getAllSalonsFromDB()

     res.status(200).send(_db_salon)
}

export default getAllSalons