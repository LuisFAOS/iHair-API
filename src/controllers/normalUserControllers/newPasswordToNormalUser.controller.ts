import { Request, Response } from 'express'

import NormalUser from '../../models/normalUser.models'

async function handleNewPassword(req: Request, res: Response){
    const { newPassword, verification_code, email } = req.body
 
    let possibleErrorMessage = NormalUser.newPassword().validate(newPassword);
    if(possibleErrorMessage) return res.status(400).send(possibleErrorMessage)
    
    const newPassword_hashed = await NormalUser.newPassword().hash(newPassword)

    const {status, message} = await NormalUser.newPassword().saveNewPasswordInDB(newPassword, verification_code, email)
    
    return res.status(status).send(message)       
}

export default handleNewPassword
