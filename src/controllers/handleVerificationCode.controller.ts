import { Request, Response } from 'express'

import createEntityInDB from '../models/createEntity.model'
import iEmailData from '../globalInterfaces/emailData'

//generate the verification code and send to email
export default async function handleVerificationCode(){
    const {email: string, templateID: string} = req.body
    
    const verification_code = Math.floor(Math.random() * (99999 - 10000) + 10000)
    
    const whereProps = {
        email
    }
    await createEntityInDB('normal_user', whereProps, {verification_code})
  
    const emailData:iEmailData = {
        emailAddress: email,
        templateID,
        dynamic_template_data: {verification_code}
    }

    await Queue.add("_send_code_mail", {
        emailData
    })
    return.status(200).send("Código de verificação gerado com sucesso!")
}
