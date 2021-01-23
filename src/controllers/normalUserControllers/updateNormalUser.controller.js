import normalUserValidationHandler from "../../validations/normalUser.validation.js"

import {updateNormalUserInDB} from "../../models/normalUser.models.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js";

async function updateNormalUser(req, res) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {
          client
     } = await jwtDecoder(authToken)
     const userDatas = req.body

     userDatas.password="**********"
     const possibleErrorMessage = await normalUserValidationHandler(userDatas)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return;
     }
     delete userDatas.password

     await updateNormalUserInDB(userDatas, client.id)

     res.status(202).send("Usuário atualizado com sucesso!")
}

export default updateNormalUser