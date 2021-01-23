import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import salonServiceValidationHandler from "../../validations/salonService.validation.js"

import {updateSalonServiceInDB} from "../../models/salonService.models.js"

async function updateSalonService(req, res) {
     const {
          updatedService,
          serviceID
     } = req.body

     const authToken = req.headers["authorization"] || req.headers["token"]
     const { client } = await jwtDecoder(authToken)

     const { id } = await getSalonFromDB({
          salonOwnerID: client.id
     })

     const possibleErrorMessage = await salonServiceValidationHandler(updatedService)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }
     await updateSalonServiceInDB(updatedService, {serviceID, salonID: id})

     res.status(202).send("Dados atualizado com sucesso!")
}

export default updateSalonService