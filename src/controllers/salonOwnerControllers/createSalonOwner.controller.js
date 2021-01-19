import salonOwnerValidationHandler from "../../validations/salonOwner.validation.js"

import bcrypt from "bcryptjs"
import {
     v4 as uuid
} from "uuid"

import {
     getSalonOwnerFromDB
} from "../../models/salonOwnerModels/getSalonOwner.model.js"
import addSalonOwnerToDB from "../../models/salonOwnerModels/createSalonOwner.model.js"

import Queue from "../../libs/queueBull/Queue.js"
import uploadImgToAzure from "../../libs/azure/uploadImgToAzure.js"

async function createSalonOwner(req, res) {
     const ownerDatas = req.body

     const validOwnerDatas = await salonOwnerValidationHandler(ownerDatas)
     if (validOwnerDatas) {
          res.status(400).send(validOwnerDatas)
          return
     }

     const dbResultsOwnerDatas = await getSalonOwnerFromDB({
          email: ownerDatas.email
     })
     if (dbResultsOwnerDatas && !dbResultsOwnerDatas.isVerified) {
          res.status(400).send("Email já foi cadastrado, porém não foi confirmado. Por favor, acesse-o e confirme-o.")
          return
     } else if (dbResultsOwnerDatas) {
          res.status(409).send("Já existe uma conta com esse email. Por favor, tente outro.")
          return
     }

     const hashedPassword = await bcrypt.hash(ownerDatas.password, 8)
     ownerDatas.passwordHashed = hashedPassword
     delete ownerDatas.password

     const emailToken = uuid().toString()
     const emailProps = {
          functionName: "sendEmailForValidation",
          emailDatas: {
               ...{
                    ...ownerDatas,
                    name: ownerDatas.completeName
               },
               emailToken
          },
     }

     ownerDatas.createdAt = new Date();
     ownerDatas.emailToken = emailToken

     ownerDatas.profileImgUrl = await uploadImgToAzure(ownerDatas.imgs.profileImgInBase64, "ownersprofileimgs")
     //ownerDatas.certificateImgUrl = await uploadImgToAzure(ownerDatas.imgs.certificateImgInBase64, "ownerscertificates")
     delete ownerDatas.imgs

     await Queue.add("RegistrationEmail", {
          emailProps
     })

     await addSalonOwnerToDB(ownerDatas)

     res.status(201).send("O dono do salão foi cadastrado, esperando confirmação do email.")
}

export default createSalonOwner