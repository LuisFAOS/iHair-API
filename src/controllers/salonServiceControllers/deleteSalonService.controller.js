
import {deleteSalonServiceFromDB} from "../../models/salonService.models.js"
import {getSalonFromDB} from "../../models/salon.models.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"


async function deleteSalonService(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const { client } = await jwtDecoder(authToken)
     
     const { id } = await getSalonFromDB({
          salonOwnerID: client.id
     })

     const {
          serviceID
     } = req.body

     if(!serviceID){
          res.status(400).send("ID do serviço vázio!")
          return 
     }
     
     await deleteSalonServiceFromDB({id: serviceID, salonID: id})

     res.status(200).send("Serviço deletado com sucesso!")
}

export default deleteSalonService