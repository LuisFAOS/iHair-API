import ClientSchedule from "../../models/clientSchedule.model"
import Salon from "../../models/salon.models"

import jwtDecoder from "../../libs/JWT/jwtDecoder"

import { Request, Response } from "express"

async function updateClientSchedule(req: Request, res: Response){
    const {
        updatedDate,
        updatedStatus,
        scheduleID
    } = req.body

    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
    const {id: clientID} = await jwtDecoder(authToken)

    const {id} = await Salon.getFromDB({
        _salon_owner_id: clientID
    })
    
    const newClientSchedule = new ClientSchedule(updatedDate, id, "", "")

    const possibleStatusErrorMessage = newClientSchedule.setStatus(updatedStatus) 
    if(possibleStatusErrorMessage){
         res.status(400).send(possibleStatusErrorMessage)
         return
    }
    if(updatedDate){
        const possibleErrorMessage = await newClientSchedule.validate()
        if (possibleErrorMessage){
            res.status(400).send(possibleErrorMessage)
            return
        }
    } 
    
    await newClientSchedule.updateInDB(scheduleID)

    res.status(202).send("Seu agendamento foi atualizado com sucesso!")
}

export default updateClientSchedule