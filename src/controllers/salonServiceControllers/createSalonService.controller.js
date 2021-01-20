import salonServiceValidationHandler from "../../validations/salonService.validation.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import getSalonFromDB from "../../models/salonModels/getSalon.model.js"
import addSalonServiceInDB from "../../models/salonServiceModels/createSalonService.model.js"


async function createSalonService(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const { client } = await jwtDecoder(authToken)

     const { id, isVerified } = await getSalonFromDB({
          salonOwnerID: client.id
     })

     if(isVerified && id){
          const salonServices = req.body

          const validSalonServices = await salonServiceValidationHandler(salonServices)
          if (validSalonServices) {
               res.status(400).send(validSalonServices)
               return
          }

          await addSalonServiceInDB(salonServices, id)
          res.status(201).send("Serviço(s) adicionado(s) com sucesso!")
          return
     }
     res.status(400).send("Ou seu salão não foi verificado ainda, ou você não cadastrou nenhum até o momento!")
}

export default createSalonService