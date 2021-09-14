import NormalUser from "../../models/normalUser.models"

import Queue from "../../libs/Queue"

import iEmailData from '../../globalInterfaces/emailData'

import {
     v4 as uuid
} from "uuid"
import { Request, Response } from "express"

async function createNormalUser(req: Request, res: Response) {
     const {
          name, CEP, email, password
     } = req.body

     const newNormalUser = new NormalUser(name, CEP, email)

     const possibleErrorMessage = await newNormalUser.validate(password)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return;
     }

     const _db_normal_user = await NormalUser.getFilteredDataFromDB({
          email: newNormalUser.email
     })

     if (_db_normal_user && !_db_normal_user.isVerified) {
          res.status(400).send("Esse email já foi cadastrado, porém não foi confirmado.");
          return
     } else if (_db_normal_user) {
          res.status(409).send("Já existe uma conta com esse email. Por favor, tente outro.")
          return
     }

     await newNormalUser.setPassword(password)

     const emailToken = uuid().toString()
    const emailData:iEmailData = {
        emailAddress: newNormalUser.email,
        templateID: "EMAIL_CONFIRMATION_TEMPLATE_ID",
        dynamic_template_data: {
            userName: newNormalUser.name,
            emailToken,
            dynamicLink: `verify-email?emailToken=${emailToken}&email=${email}`
        },
     }

     await Queue.add("_registration_mail", {
          emailData
     })

     await newNormalUser.addToDB(emailToken);

     res.status(201).send("Usuário criado! Esperando confirmação do email.")
}

export default createNormalUser
