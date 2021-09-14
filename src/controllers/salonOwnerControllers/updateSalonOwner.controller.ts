import SalonOwner from "../../models/salonOwner.models"

import jwtDecoder from "../../libs/JWT/jwtDecoder";

async function updateSalonOwner(req, res) {
     const salon_owner_req = req.body
     const authToken = req.headers['authorization'] || req.headers['x-access-token'] || req.heade
     const {
          id: clientID
     } = await jwtDecoder(authToken)

     const possibleErrorMessage = await SalonOwner.validate(salon_owner_req.raw_data, salon_owner_req.files, true)
     
     if (possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }
     Object.keys(salon_owner_req.raw_data).forEach(key => {
          const dataWithMailConfirmation = ['email', 'phone', 'password']
          if(dataWithMailConfirmation.includes(key)){
               //send mail
          }
     })
     
     await SalonOwner.updateInDB(salon_owner_req.raw_data, {id: clientID})

     res.status(202).send("Dados do proprietário atualizado com sucesso!")
}

export default updateSalonOwner