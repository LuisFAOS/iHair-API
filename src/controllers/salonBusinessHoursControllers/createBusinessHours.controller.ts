import { Request, Response } from 'express'
import jwtDecoder from '../../libs/JWT/jwtDecoder'

import BusinessHours from "../../models/businessHours.models"
import Salon from "../../models/salon.models"

async function createBusinessHours(req: Request, res: Response){
    const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
    const {
         id: clientID
    } = await jwtDecoder(authToken)

    const {id: _salon_id} = await Salon.getFromDB({
            _salon_owner_id: clientID
    })

    const possibleErrorMessageExistingData = await BusinessHours.existInDB({_salon_id})

    const data = req.body

    const newBusinessHoursArray = new BusinessHours(data, _salon_id)
    const possibleValidationMessage = await newBusinessHoursArray.validate()

    if(possibleErrorMessageExistingData || possibleValidationMessage){
        res.status(400).send(possibleErrorMessageExistingData || possibleValidationMessage)
        return
    }

    await newBusinessHoursArray.addToDB()

    res.status(201).send("Horários cadastrados com sucesso!")
}

export default createBusinessHours 
