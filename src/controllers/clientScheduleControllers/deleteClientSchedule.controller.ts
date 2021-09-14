import Salon from "../../models/salon.models"
import ClientSchedule from "../../models/clientSchedule.model"

import jwtDecoder from "../../libs/JWT/jwtDecoder"
import { Request, Response } from "express"

async function deleteClientSchedule(req: Request, res: Response) {
     const _client_schedule_id: string = req.body

     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {id: clientID} = await jwtDecoder(authToken)

     const {id: _salon_id} = await Salon.getFromDB({
          _salon_owner_id: clientID
     })

     await ClientSchedule.deleteFromDB({
          id: _client_schedule_id,
          _salon_id
     })

     res.status(200).send("Agendamento cancelado com sucesso!")
}

export default deleteClientSchedule