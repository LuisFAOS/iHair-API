import updateEntityInDB from "../models/updateEntity.model.js"
import getNormalUserFromDB from "../models/normalUserModels/getNormalUserModel.js"
import {
     getSalonOwnerFromDB
} from "../models/salonOwnerModels/getSalonOwner.model.js"


async function emailConfirmationHandler(req, res) {
     const {
          emailToken,
          email
     } = req.query

     const dbResultUserDatas = await getNormalUserFromDB({
          emailToken,
          email
     })
     const dbResultOwnerDatas = await getSalonOwnerFromDB({
          emailToken,
          email
     })
     const entityName = dbResultUserDatas ? "normalUser" : "salonOwner"
     const clientDatas = dbResultUserDatas || dbResultOwnerDatas

     if (clientDatas && !clientDatas.isVerified) {
          await updateEntityInDB(entityName, {
               emailToken: null,
               isVerified: true,
          }, {
               id: clientDatas.id
          })

          res.status(202).send("Parabéns 🥳! Sua conta foi confirmada, já pode usar nossos serviços!")
          return
     }

     res.status(400).send("Seu email já foi confirmada.")
}

export default emailConfirmationHandler