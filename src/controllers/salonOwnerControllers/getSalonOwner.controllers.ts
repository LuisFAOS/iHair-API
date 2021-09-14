import bcrypt from "bcryptjs"
import { Request, Response } from "express"

import jwtDecoder from "../../libs/JWT/jwtDecoder"
import jwtGenerator from "../../libs/JWT/jwtGenerator"

import Salon from "../../models/salon.models"
import SalonOwner from "../../models/salonOwner.models"

async function getSalonOwnerByID(req: Request, res: Response) {
     const authToken = req.headers['authorization'] || req.headers['x-access-token']
     const {
          id, name,
          permissionOf
     } = await jwtDecoder(authToken)

     
     const _db_salon_owner = await SalonOwner.getFilteredDataFromDB({id})
     
     if(!_db_salon_owner){
          res.status(400).send("ID do dono inválido!")
          return
     }

     if (permissionOf === "normalUser") {
          const {
               complete_name,
               profile_img_URL,
          } = _db_salon_owner

          res.status(202).send({
               salonOwner: {
                    complete_name,
                    profile_img_URL, 
               }
          })

          return
     }else if(permissionOf === "salonOwner"){
          res.status(202).send(_db_salon_owner)

          return
     }
}

async function loginHandler(req: Request, res: Response) {
     const {
          email,
          password
     } = req.body

     const _db_salon_owner = await SalonOwner.getAllDataFromDB({
          email
     })

     if(!_db_salon_owner || !_db_salon_owner.is_verified) {
          res.status(400).send("O email ou não foi cadastrado ou não foi validado, verifique")
          return
     }

     /* const _db_salon = await getSalonFromDB({
          salonOwnerID: _db_salon_owner.id,
     })
     if(!_db_salon || !_db_salon.isVerified){
          res.status(400).send("Seu salão ainda não foi aprovado, volte mais tarde.")
          return  
     }
     */
     const isValidPassword = await bcrypt.compare(password, _db_salon_owner.password_hashed)
     if (!isValidPassword) {
          res.status(404).send("Senha está incorreta. Por favor, tente outra.")
          return
     }

     const authToken = await jwtGenerator({id: _db_salon_owner.id, name: _db_salon_owner.complete_name}, "salonOwner");
     const {
          id,
          name,
          permissionOf
     } = await jwtDecoder(authToken)

     res.status(202).send({
          id,
          name,
          permissionOf,
          authToken
     })
}

export {
     getSalonOwnerByID,
     loginHandler
}