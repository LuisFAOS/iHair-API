import jwtDecoder from "../../libs/JWT/jwtDecoder"

import salonServiceValidationHandler from "../../validations/salonService.validation"

import SalonService from "../../models/salonService.models"
import Salon from "../../models/salon.models"

async function updateSalonService(req, res) {
     const {
          updatedService,
          _salon_service_id
     } = req.body

     const authToken = req.headers["authorization"] || req.headers["token"]
     const { id:clientID } = await jwtDecoder(authToken)

     const { id: _salon_id } = await Salon.getFromDB({
          _salon_owner_id: clientID
     })

     const possibleErrorMessage = await salonServiceValidationHandler(updatedService)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     await SalonService.updateInDB(updatedService, {_salon_service_id, _salon_id})

     res.status(202).send("Dados atualizado com sucesso!")
}

export default updateSalonService