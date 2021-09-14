import ClientSchedule from "../../models/clientSchedule.model"

import jwtDecoder from "../../libs/JWT/jwtDecoder"
import returnAsPerUserRole from "../../utils/returnAsPerUserRole"

import { Request, Response } from "express"

async function getClientSchedule(req: Request, res: Response) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const {id, name, permissionOf} = await jwtDecoder(authToken)

     const whereProps = await returnAsPerUserRole(permissionOf, {id, name})

     const _db_client_schedule = await ClientSchedule.getFromDB(whereProps)
     res.status(200).send(_db_client_schedule)
}


export default getClientSchedule