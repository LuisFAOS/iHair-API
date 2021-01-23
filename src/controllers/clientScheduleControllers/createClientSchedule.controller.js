import clientScheduleValidationHandler from "../../validations/clientSchedule.validation.js"

import {addClientScheduleInDB, getClientScheduleFromDB} from "../../models/clientSchedule.models.js"
import {getSalonFromDB} from "../../models/salon.models.js"


import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

async function createClientSchedule(req, res) {
     const {
          clientSchedule,
          salonServiceID,
          normalUserID
     } = req.body

     if(!normalUserID && !salonServiceID){
          res.status(400).send("ID(s) vázio(s): id do cliente ou do serviço")
          return
     }

     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {
          client
     } = await jwtDecoder(authToken)

     const {id} = await getSalonFromDB({
          salonOwnerID: client.id
     })
     let dbResultClientSchedules = await getClientScheduleFromDB({
          normalUserID
     })
     
     if(typeof clientSchedule.scheduleDate === "string"){
          clientSchedule.scheduleDate = new Date(clientSchedule.scheduleDate)
     }
     
     const openSchedules = dbResultClientSchedules.filter(schedule => schedule.status === "EM ABERTO")
     if (openSchedules.length == 5) {
          res.status(400).send("Parece que o cliente já atingiu o máximo de agendamentos ativos")
          return
     }

     dbResultClientSchedules = await getClientScheduleFromDB({
          scheduleDate: clientSchedule.scheduleDate,
          status: "EM ABERTO"
     })
     if(dbResultClientSchedules[0]){
          res.status(400).send("Já existe um agendamento para essa data!")
          return
     }

     const possibleErrorMessage = await clientScheduleValidationHandler(clientSchedule)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     clientSchedule.createdAt = new Date()
     clientSchedule.status = "EM ABERTO"
     await addClientScheduleInDB(clientSchedule, {salonID: id}, salonServiceID, normalUserID)

     res.status(201).send("Agendamento concluido com sucesso!")
}


export default createClientSchedule