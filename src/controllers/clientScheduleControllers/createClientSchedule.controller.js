import clientScheduleValidationHandler from "../../validations/clientSchedule.validation.js"

import addClientScheduleInDB from "../../models/clientScheduleModels/createClientSchedule.model.js"
import getClientScheduleFromDB from "../../models/clientScheduleModels/getClientSchedule.model.js"

async function createClientSchedule(req, res) {
     const {
          clientSchedule,
          salonID,
          salonServiceID,
          normalUserID
     } = req.body

     const dbResultClientSchedule = await getClientScheduleFromDB({
          salonID
     })

     const openSchedules = dbResultClientSchedules.filter(schedule => schedule.status === "EM ABERTO")
     if (openSchedules.length == 5) {
          res.status(400).send("Parece que você atingiu o máximo de agendamentos ativos")
          return
     }

     const validClientSchedule = await clientScheduleValidationHandler(clientSchedule)
     if (validClientSchedule) {
          res.status(400).send(validClientSchedule)
          return
     }

     await addClientScheduleInDB(clientSchedule, salonID, salonServiceID, normalUserID)

     res.status(201).send("Agendamento concluido com sucesso!")
}


export default createClientSchedule