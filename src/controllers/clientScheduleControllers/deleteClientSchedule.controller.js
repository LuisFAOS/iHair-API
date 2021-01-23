import {getSalonFromDB} from "../../models/salon.models.js"
import {deleteClientScheduleFromDB} from "../../models/clientSchedule.models.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

async function deleteClientSchedule(req, res) {
     const {
          clientScheduleID
     } = req.body

     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {
          client
     } = await jwtDecoder(authToken)

     const {id} = await getSalonFromDB({
          salonOwnerID: client.id
     })

     await deleteClientScheduleFromDB({
          id: clientScheduleID,
          salonID: id
     })

     res.status(200).send("Agendamento cancelado com sucesso!")

}

export default deleteClientSchedule