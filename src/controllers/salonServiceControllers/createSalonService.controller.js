import salonServiceValidationHandler from "../../validations/salonService.validation.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import {getSalonFromDB} from "../../models/salon.models.js"
import {addSalonServiceInDB} from "../../models/salonService.models.js"


async function createSalonService(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const { client } = await jwtDecoder(authToken)

     const { id } = await getSalonFromDB({
          salonOwnerID: client.id
     })

     const salonServices = req.body

     const possibleErrorMessage = await salonServiceValidationHandler(salonServices)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     await addSalonServiceInDB(salonServices, id)

     res.status(201).send("Serviço(s) adicionado(s) com sucesso!")
}

export default createSalonService