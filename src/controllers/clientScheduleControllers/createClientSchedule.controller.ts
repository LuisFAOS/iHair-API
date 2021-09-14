import ClientSchedule from "../../models/clientSchedule.model"
import Salon from "../../models/salon.models"

import jwtDecoder from "../../libs/JWT/jwtDecoder"
import { Request, Response } from "express"


async function createClientSchedule(req: Request, res: Response) {
     const {
          date,
          _salon_service_id,
          _normal_user_id
     } = req.body

     if(!_normal_user_id && !_salon_service_id){
          res.status(400).send("ID(s) vázio(s): id do cliente ou do serviço")
          return
     }

     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     const {id: clientID} = await jwtDecoder(authToken)

     const {id: _salon_id} = await Salon.getFromDB({
          _salon_owner_id: clientID
     })
     const newClientSchedule = new ClientSchedule(date, _salon_id, _salon_service_id, _normal_user_id)
     
     const _db_client_schedules = await ClientSchedule.getFromDB({
          date: newClientSchedule.date,
          _normal_user_id,
          status: 'EM ABERTO'
     })

     const openSchedules = _db_client_schedules.filter(clientScheduleFromDB => clientScheduleFromDB.status === "EM ABERTO")
     const schedulesWithSameDate = _db_client_schedules.filter(clientScheduleFromDB => clientScheduleFromDB.date === newClientSchedule.date.toISOString())
     if (openSchedules.length == 7 || schedulesWithSameDate.length >= 2) {
          res.status(400).send("Parece que o cliente já atingiu o máximo de agendamentos ativos")
          return
     }
     
     if(_db_client_schedules[0]){
          res.status(400).send("Já existe um agendamento para essa data!")
          return
     }

     const possibleErrorMessage = await newClientSchedule.validate()
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     await newClientSchedule.addToDB()

     res.status(201).send("Agendamento concluido com sucesso!")
}


export default createClientSchedule