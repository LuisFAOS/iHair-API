import salonOwnerValidationHandler from "../../validations/salonOwner.validation.js"

import {updateSalonOwnerInDB} from "../../models/salonOwner.models.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js";

async function updateSalonOwner(req, res) {
     const ownerDatas = req.body
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.heade
     const {
          client
     } = await jwtDecoder(authToken)

     ownerDatas.password="**********"
     const possibleErrorMessage = await salonOwnerValidationHandler(ownerDatas)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }
     delete ownerDatas.password
     
     await updateSalonOwnerInDB(ownerDatas, client.id)

     res.status(202).send("Dados do proprietário atualizado com sucesso!")
}

export default updateSalonOwner