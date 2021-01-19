import normalUserValidationHandler from "../../validations/normalUserValidation.js"
import addNormalUserToDB from "../../models/normalUserModels/createNormalUserModel.js"
import getNormalUserFromDB from "../../models/normalUserModels/getNormalUserModel.js"

import Queue from "../../libs/queueBull/Queue.js"
import tokenGenerator from "../../libs/JWT/jwtTokenGenerator.js"
import tokenDecoder from "../../libs/JWT/jwtTokenDecoder.js"

import bcrypt from "bcryptjs"
import {
     v4 as uuid
} from "uuid"

async function createNormalUser(req, res) {
     const userDatas = req.body

     const validUserDatas = await normalUserValidationHandler(userDatas)
     if (validUserDatas) {
          res.status(400).send(validUserDatas)
          return;
     }

     const dbResultUserDatas = await getNormalUserFromDB({
          email: userDatas.email
     })

     if (dbResultUserDatas && !dbResultUserDatas.isVerified) {
          res.status(400).send("Esse email já foi cadastrado, porém não foi confirmado. Por favor, vá até a seu email e confirme.");
          return
     } else if (dbResultUserDatas) {
          res.status(409).send("Já existe uma conta com esse email. Por favor, tente outro.")
          return
     }
     const hashedPassword = await bcrypt.hash(userDatas.password, 10)
     userDatas.passwordHashed = hashedPassword

     delete userDatas.password


     const emailToken = uuid().toString()
     const emailProps = {
          functionName: "sendEmailForValidation",
          emailDatas: {
               ...userDatas,
               emailToken
          },
     }

     await Queue.add("RegistrationEmail", {
          emailProps
     })

     userDatas.createdAt = new Date();
     userDatas.emailToken = emailToken

     await addNormalUserToDB(userDatas);

     res.status(201).send("Usuário criado, esperando confirmação do email.")

}

export default createNormalUser