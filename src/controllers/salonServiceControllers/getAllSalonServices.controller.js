import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import getSalonFromDB from "../../models/salonModels/getSalon.model.js"
import getSalonServiceFromDB from "../../models/salonServiceModels/getSalonService.model.js"


async function getAllSalonServices(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const { client } = await jwtDecoder(authToken)

     const { isVerified, id } = await getSalonFromDB({ salonOwnerID: client.id })

     if(isVerified && id){
          const dbResultSalonServicesDatas = await getSalonServiceFromDB({
               salonID: client.id
          })

          res.status(200).send(dbResultSalonServicesDatas)
          return
     }

     res.status(400).send("Ou seu salão não foi verificado, ou você não cadastrou nenhum até o momento!")

}

export default getAllSalonServices