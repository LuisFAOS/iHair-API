import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import salonValidationHandler from "../../validations/salon.validation.js"

import {updateSalonInDB} from "../../models/salon.models.js"


async function updateSalon(req, res) {
     const authToken = req.headers['authorization'] || req.headers['token']
     const {
          client
     } = await jwtDecoder(authToken)

     const updatedSalonDatas = req.body.salonDatas

     const possibleErrorMessage = await salonValidationHandler(updatedSalonDatas, true)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     await updateSalonInDB(updatedSalonDatas, {
          salonOwnerID: client.id
     })

     res.status(200).send("Dados atualizados com sucesso!")
}

export default updateSalon