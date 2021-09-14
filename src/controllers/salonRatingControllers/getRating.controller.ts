import { Request, Response } from "express"
import jwtDecoder from "../../libs/JWT/jwtDecoder"

import SalonRating from "../../models/salonRating.models"

import returnAsPerUserRole from "../../utils/returnAsPerUserRole"

async function getSalonRatings(req: Request, res: Response){
    const authToken = req.headers["authorization"] || req.headers["token"]
    const {id, name, permissionOf} = await jwtDecoder(authToken)

    const whereProps = await returnAsPerUserRole(permissionOf, {id, name})

    const _db_salon_ratings = await SalonRating.getFromDB(whereProps)
    res.status(200).send(_db_salon_ratings)
}   

export default getSalonRatings