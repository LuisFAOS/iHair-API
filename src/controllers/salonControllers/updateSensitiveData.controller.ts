import {Request, Response} from 'express'

import jwtDecoder from "../../libs/JWT/jwtDecoder"
import Queue from '../../libs/Queue'

import iEmailData from '../../globalInterfaces/emailData'

import SalonOwner from '../../models/salonOwner.models'


export default async function updateSensitiveSalonData(req: Request, res: Response) {
    const updatedData = req.body
    const authToken = req.headers['authorization'] || req.headers['token']

    const {
        id: clientID,
   } = await jwtDecoder(authToken)

    const {email, complete_name, email_token: emailToken} = await SalonOwner.getAllDataFromDB({
        id: clientID
    })

    Object.entries(updatedData).forEach(async ([key, value]) => {
        if (['address', 'contact_phone'].includes(key)) {

            const emailData:iEmailData = {
                emailBody: {
                     emailAddress: email,
                     userName: complete_name,
                     emailToken
                },
                templateID: "",
                linkDirectoryAndParams: ""
           }      

            await Queue.add("_registration_mail", {
                emailData
            })
        }
    })

    res.status(200).send('Dados atualizados com sucesso!')
}
