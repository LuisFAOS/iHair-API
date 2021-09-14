import jwtDecoder from "../../libs/JWT/jwtDecoder"

import Salon from "../../models/salon.models"
import SalonOwner from "../../models/salonOwner.models"
import { Request, Response } from "express"


async function createSalon(req: Request, res: Response) {
     const auth_token = req.headers['authorization'] || req.headers['x-access-token'] || req.headers['token']
     
     const {id: clientID} = await jwtDecoder(auth_token)

     const _db_salon = await Salon.getFromDB({
          _salon_owner_id: clientID
     })
     if (_db_salon) {
          res.status(406).send("Já existe um salão cadastrado nessa conta.")
          return
     }

     const salon_req = req.body

     if (salon_req.is_accept_person_phone_as_contact) {
          const salon_owner_from_db = await SalonOwner.getAllDataFromDB({
               id: clientID
          })
          salon_req.contact_phone = salon_owner_from_db.phone
     }

     const {
          name, 
          contact_phone, 
          CEP, 
          address_number, 
          CNPJ, 
          salon_description, 
          type_service, 
          banner_img_base64
     } = salon_req
     const new_salon = new Salon(
               name, contact_phone, CEP, 
               address_number, CNPJ, salon_description, type_service, clientID)


     const possibleErrorMessage = await Salon.validate(new_salon, banner_img_base64)

     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     await new_salon.addToDB()

     const {id: _salon_id} = await Salon.getFromDB({
          _salon_owner_id: clientID
     })
     //await Salon.addSalonImgsToDB([], _salon_id)

     await SalonOwner.updateInDB({
          has_salon: true
     },
     {
          id: clientID
     })

     res.status(201).send("Salão criado com sucesso!")
}

export default createSalon