import openingHoursValidationHandler from "../../validations/openingHours.validation.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import {getSalonFromDB} from "../../models/salon.models.js"
import {updateOpeningHoursInDB} from "../../models/openingHours.models.js"

async function updateOpeningHours(req, res) {
     const {
          openingHours
     } = req.body

     const possibleErrorMessage = await openingHoursValidationHandler(openingHours)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     const authToken = req.headers["authorization"] || req.headers["token"]
     const { client } = await jwtDecoder(authToken)

     const { id } = await getSalonFromDB({ salonOwnerID: client.id })

     await updateOpeningHoursInDB(openingHours, {
          salonID: id
     })
     
     res.status(202).send("Dados atualizados com sucesso!")
}


export default updateOpeningHours