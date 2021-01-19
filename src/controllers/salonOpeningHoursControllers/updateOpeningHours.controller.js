import openingHoursValidationHandler from "../../validations/openingHours.validation.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import getSalonFromDB from "../../models/salonModels/getSalon.model.js"
import updateOpeningHoursInDB from "../../models/openingHoursModels/updateOpeningHours.model.js"

async function updateOpeningHours(req, res) {
     const {
          openingHoursDatas
     } = req.body

     const validOpeningHours = await openingHoursValidationHandler(openingHoursDatas)
     if (validOpeningHours) {
          res.status(400).send(validOpeningHpurs)
          return
     }

     const authToken = req.headers["authorization"] || req.headers["token"]
     const {
          client
     } = await jwtDecoder(authToken)

     const {
          isVerified,
          id
     } = await getSalonFromDB({
          salonOwnerID: client.id
     })
     if (isVerified && id) {
          await updateOpeningHoursInDB(openingHoursDatas, {
               salonID: id
          })
          res.status(202).send("Dados atualizados com sucesso!")
          return
     }

     res.status(400).send("Ou seu salão ainda não foi validado, ou você não possui um!")
}


export default updateOpeningHours