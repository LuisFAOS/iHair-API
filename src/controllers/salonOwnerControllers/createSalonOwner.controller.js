import salonOwnerValidationHandler from "../../validations/salonOwner.validation.js"

import bcrypt from "bcryptjs"
import {
     v4 as uuid
} from "uuid"

import {
     getSalonOwnerFromDB
} from "../../models/salonOwner.models.js"
import {addSalonOwnerToDB} from "../../models/salonOwner.models.js"

import Queue from "../../libs/queueBull/Queue.js"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure.js"

async function createSalonOwner(req, res) {
     const salonOwner = req.body	

     const possibleErrorMessage = await salonOwnerValidationHandler(salonOwner)
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     const dbResultsOwnerDatas = await getSalonOwnerFromDB({
          email: salonOwner.email
     })
     if (dbResultsOwnerDatas && !dbResultsOwnerDatas.isVerified) {
          res.status(400).send("Email já foi cadastrado, porém não foi confirmado. Por favor, acesse-o e confirme-o.")
          return
     } else if (dbResultsOwnerDatas) {
          res.status(409).send("Já existe uma conta com esse email. Por favor, tente outro.")
          return
     }

     const hashedPassword = await bcrypt.hash(salonOwner.password, 8)
     salonOwner.passwordHashed = hashedPassword
     delete salonOwner.password

     const emailToken = uuid().toString()
     const emailProps = {
          functionName: "sendEmailForValidation",
          emailDatas: {
               ...{
                    ...salonOwner,
                    name: salonOwner.completeName
               },
               emailToken
          },
     }

     salonOwner.createdAt = new Date();
     salonOwner.emailToken = emailToken

     salonOwner.profileImgUrl = await uploadImgToAzure(salonOwner.imgs.profileImgInBase64, "ownersprofileimgs")
     if(salonOwner.imgs.certificateImgInBase64){
          salonOwner.certificateImgUrl = await uploadImgToAzure(salonOwner.imgs.certificateImgInBase64, "ownerscertificates")
     }
     delete salonOwner.imgs

     await Queue.add("RegistrationEmail", {
          emailProps
     })

     await addSalonOwnerToDB(salonOwner)

     res.status(201).send("O dono do salão foi cadastrado, esperando confirmação do email.")
}

export default createSalonOwner