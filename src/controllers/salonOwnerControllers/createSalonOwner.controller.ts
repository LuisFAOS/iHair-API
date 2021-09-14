import { Request, Response } from "express"
import {
     v4 as uuid
} from "uuid"

import SalonOwner from "../../models/salonOwner.models"

import Queue from "../../libs/Queue"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure"
import iEmailData from "../../globalInterfaces/emailData"

async function createSalonOwner(req: Request, res: Response) {
    const {complete_name, email, password, phone, files} = req.body	
    
    const newSalonOwner = new SalonOwner(complete_name, phone, email)

    const possibleErrorMessage = await SalonOwner.validate({complete_name, email, password, phone}, files)
    if (possibleErrorMessage) return res.status(400).send(possibleErrorMessage)
        

    const _db_salon_owner = await SalonOwner.getAllDataFromDB({
        email,
    })
    if (_db_salon_owner && !_db_salon_owner.is_verified) {
        res.status(400).send("Email já foi cadastrado, porém não foi confirmado.")
        return
    } else if (_db_salon_owner) {
        res.status(409).send("Já existe uma conta com esse email. Por favor, tente outro.")
        return
    }

    await newSalonOwner.setPassword(password)

    const emailToken = uuid().toString()
    const emailData:iEmailData = {
        emailAddress: email,
        templateID: "EMAIL_CONFIRMATION_TEMPLATE_ID",
        dynamic_template_data: {
            userName: complete_name,
            emailToken,
            dynamicLink: `verify-email?emailToken=${emailToken}&email=${email}`
        },
    }

    /* salonOwner.profileImgUrl = await uploadImgToAzure(salonOwner.imgs.profileImgInBase64, "ownersprofileimgs")
    if(salonOwner.imgs.certificateImgInBase64){
        salonOwner.certificateImgUrl = await uploadImgToAzure(salonOwner.imgs.certificateImgInBase64, "ownerscertificates")
    }
    delete salonOwner.imgs */

    await Queue.add("_registration_mail", {
        emailData
    })

    await newSalonOwner.addToDB(emailToken)

    res.status(201).send("O dono do salão foi cadastrado, esperando confirmação do email.")
}

export default createSalonOwner
