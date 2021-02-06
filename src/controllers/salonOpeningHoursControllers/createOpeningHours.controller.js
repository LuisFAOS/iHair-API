import openingHoursValidationHandler from "../../validations/openingHours.validation.js"

import {addOpeningHoursInDB, getOpeningHoursFromDB} from "../../models/openingHours.models.js"

async function createOpeningHours(req, res){
    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
    const {
         client
    } = await jwtDecoder(authToken)

    const dbResultSalonDatas = await getSalonFromDB({
            salonOwnerID: client.id
    })
    
    const dbResultOpeningHoursDatas = await getOpeningHoursFromDB(dbResultSalonDatas.id)

    const openingHours = req.body

    const possibleErrorMessage = await openingHoursValidationHandler(openingHours)
    if(possibleErrorMessage || dbResultOpeningHoursDatas){
        res.status(400).send(possibleErrorMessage || "VocÊ já cadastrou os horários de funcionamento!")
        return
    }
    
    addOpeningHoursInDB(openingHours, dbResultSalonDatas.id)

    res.status(201).send("Horários cadastrados com sucesso!")
}

export default createOpeningHours