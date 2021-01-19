import normalUserValidationHandler from "../../validations/normalUserValidation.js"

import updateUserDatasDB from "../../models/normalUserModels/updateNormalUserModel.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js";

async function updateNormalUser(req, res) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {
          client
     } = await jwtDecoder(authToken)
     const userDatas = req.body

     userDatas.password="**********"
     const validnUserDatas = await normalUserValidationHandler(userDatas)
     if (validnUserDatas) {
          res.status(400).send(validnUserDatas)
          return;
     }
     delete userDatas.password

     await updateUserDatasDB(userDatas, client.id)

     res.status(202).send("Usuário atualizado com sucesso!")
}

export default updateNormalUser