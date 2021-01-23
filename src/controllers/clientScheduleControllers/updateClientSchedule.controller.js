import clientScheduleValidationHandler from "../../validations/clientSchedule.validation.js"

import {updateClientScheduleInDB} from "../../models/clientSchedule.models.js"
import {getSalonFromDB} from "../../models/salon.models.js"

import jwtDecoder from "../../libs/JWT/jwtTokenDecoder.js"

async function updateClientSchedule(req,res){
    const {
        updatedClientSchedule,
        scheduleID
    } = req.body

    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
    const {
        client
    } = await jwtDecoder(authToken)

    const {id} = await getSalonFromDB({
        salonOwnerID: client.id
    })
    
    const possiblesStatus = ['FECHADO','CANCELADO','FALTOU']
    if(updatedClientSchedule.status && !possiblesStatus.includes(updatedClientSchedule.status)){
         res.status(400).send("Status inválido. Escolha um desses: 'FECHADO','CANCELADO','FALTOU'")
         return
    }
    if(updatedClientSchedule.scheduleDate){
        const possibleErrorMessage = await clientScheduleValidationHandler(updatedClientSchedule)
        if (possibleErrorMessage) {
            res.status(400).send(possibleErrorMessage)
            return
        }
    } 
    
    await updateClientScheduleInDB(updatedClientSchedule, {salonID: id}, scheduleID)

    res.status(202).send("Seu agendamento foi atualizado com sucesso!")
    
}

export default updateClientSchedule