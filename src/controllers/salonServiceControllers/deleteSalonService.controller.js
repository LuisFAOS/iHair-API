
import deleteSalonServiceFromDB from "../../models/salonServiceModels/deleteSalonService.model.js"
import getSalonFromDB from "../../models/salonModels/getSalon.model.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"


async function deleteSalonService(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const { client } = await jwtDecoder(authToken)
     
     const { id, isVerified } = await getSalonFromDB({
          salonOwnerID: client.id
     })

     const {
          serviceID
     } = req.body

     if(!id && !isVerified){
          res.status(400).send("Ou seu salão não foi verificado ainda, ou você não cadastrou nenhum até o momento!")
          return 
     }else if(!serviceID){
          res.status(400).send("ID do serviço vázio!")
          return 
     }
     
     await deleteSalonServiceFromDB({id: serviceID, salonID: id})

     res.status(200).send("Serviço deletado com sucesso!")
}

export default deleteSalonService