import { Request, Response } from "express"
import jwtDecoder from "../../libs/JWT/jwtDecoder"

import Salon from "../../models/salon.models"

async function updateSalon(req: Request, res: Response) {
     const authToken = req.headers['authorization'] || req.headers['token']
     const {
          id: clientID
     } = await jwtDecoder(authToken)

     const {salon_description, name, type_service} = req.body

     const updatedSalonData = {salon_description, name, type_service}

     const possibleErrorMessage = await Salon.validate(updatedSalonData, null,true)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     await Salon.updateInDB(updatedSalonData, {
          _salon_owner_id: clientID
     })

     res.status(200).send("Dados atualizados com sucesso!")
}

export default updateSalon