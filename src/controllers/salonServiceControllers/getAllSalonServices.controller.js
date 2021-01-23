import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import {getSalonFromDB} from "../../models/salon.models.js"
import {getSalonServiceFromDB} from "../../models/salonService.models.js"


async function getAllSalonServices(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const {
          client,
          permissionOf
     } = await jwtDecoder(authToken)
     var whereProps

     if (permissionOf === "normalUser") {
          whereProps = {
               salonID: req.body.salonID
          }
     }else {
          const {id} = await getSalonFromDB({
               salonOwnerID: client.id
          })

          whereProps = {
               salonID: id
          }
     }

     const dbResultSalonServicesDatas = await getSalonServiceFromDB(whereProps)

     res.status(200).send(dbResultSalonServicesDatas)

}

export default getAllSalonServices