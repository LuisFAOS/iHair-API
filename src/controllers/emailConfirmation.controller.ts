import updateEntityInDB from "../models/updateEntity.model"
import NormalUser from "../models/normalUser.models"
import SalonOwner from "../models/salonOwner.models"
import { Request, Response } from "express"


async function emailConfirmationHandler(req: Request, res: Response) {
     const {
          email_token,
          email
     } = req.query

     const _db_normal_user = await NormalUser.getAllDataFromDB({
          email_token,
          email
     })
     const _db_salon_owner = await SalonOwner.getAllDataFromDB({
          email_token,
          email
     })
     const entityName = _db_normal_user ? "normal_user" : "salon_owner"
     const client = _db_normal_user || _db_salon_owner

     if (client && !client.is_verified) {
          await updateEntityInDB(entityName, {
               email_token: null,
               is_verified: true,
          }, {
               id: client.id
          })

          res.status(202).send("Parabéns 🥳! Sua conta foi confirmada, já pode usar nossos serviços!")
          return
     }

     res.status(400).send("Seu email já foi confirmada.")
}

export default emailConfirmationHandler