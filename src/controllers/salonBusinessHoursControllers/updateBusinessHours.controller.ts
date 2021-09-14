import jwtDecoder from "../../libs/JWT/jwtDecoder"

import Salon from "../../models/salon.models"
import BusinessHours from "../../models/businessHours.models"
import { Request, Response } from "express"

async function updateBusinessHours(req: Request, res: Response) {
     const data = req.body
     const authToken = req.headers["authorization"] || req.headers["token"]

     const { id: clientID } = await jwtDecoder(authToken)
     
     const { id: _salon_id } = await Salon.getFromDB({ _salon_owner_id: clientID })

     const updatedBusinessHours = new BusinessHours(data, _salon_id)
     const possibleErrorMessage = updatedBusinessHours.validate(true)

     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     updatedBusinessHours.updateInDB({
          _salon_id
     })
     
     res.status(202).send("Dados atualizados com sucesso!")
}


export default updateBusinessHours