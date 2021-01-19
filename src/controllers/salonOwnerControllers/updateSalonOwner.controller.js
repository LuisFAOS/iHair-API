import salonOwnerValidationHandler from "../../validations/salonOwner.validation.js"

import updateSalonOwnerDatasInDB from "../../models/salonOwnerModels/updateSalonOwner.model.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js";

async function updateSalonOwner(req, res) {
     const ownerDatas = req.body
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.heade
     const {
          client
     } = await jwtDecoder(authToken)

     ownerDatas.password="**********"
     const validOwnerDatas = await salonOwnerValidationHandler(ownerDatas)
     if (validOwnerDatas) {
          res.status(400).send(validOwnerDatas)
          return
     }

     delete ownerDatas.password
     await updateSalonOwnerDatasInDB(ownerDatas, client.id)
}

export default updateSalonOwner