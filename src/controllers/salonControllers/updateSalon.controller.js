import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import salonValidationHandler from "../../validations/salon.validation.js"

import updateSalonInDB from "../../models/salonModels/updateSalon.model.js"


async function updateSalon(req, res) {
     const authToken = req.headers['authorization'] || req.headers['token']
     const {
          client
     } = await jwtDecoder(authToken)

     const salonDatas = req.body
     const validSalonDatas = await salonValidationHandler(salonDatas)
     if (validSalonDatas) {
          res.status(400).send(validSalonDatas)
          return
     }
     await updateSalonInDB(salonDatas, {
          salonOwnerID: client.id
     })

     res.status(200).send("Dados atualizados com sucesso!")
}

export default updateSalon