import {getSalonFromDB} from "../../models/salon.models.js"
import {getClientScheduleFromDB} from "../../models/clientSchedule.models.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

async function getClientSchedule(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const {
          client,
          permissionOf
     } = await jwtDecoder(authToken)

     var whereProps
     if (permissionOf === "normalUser") {
          whereProps = {
               normalUserID: client.id
          }
     } else {
          const {id} = await getSalonFromDB({
               salonOwnerID: client.id
          })

          whereProps = {
               salonID: id
          }
     }

     const dbResultClientSchedules = await getClientScheduleFromDB(whereProps)
     res.status(200).send(dbResultClientSchedules)
}


export default getClientSchedule