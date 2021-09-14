import salonServiceValidationHandler from "../../validations/salonService.validation"

import jwtDecoder from "../../libs/JWT/jwtDecoder"

import Salon from "../../models/salon.models"
import SalonService from "../../models/salonService.models"


async function createSalonService(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const {id: clientID} = await jwtDecoder(authToken)

     const { id: _salon_id } = await Salon.getFromDB({
          _salon_owner_id: clientID
     })

     const _req_salon_services: Array<any> = req.body

     const newSalonServices: Array<SalonService> = []
     _req_salon_services.forEach(({name, description, price, avg_time}) => {
          newSalonServices.push(new SalonService(name, description, price, avg_time))
     })

     const possibleErrorMessage = await SalonService.validate(newSalonServices)

     if(possibleErrorMessage) {
          res.status(400).send(possibleErrorMessage)
          return
     }

     newSalonServices.forEach(async newSalonService => {
          await newSalonService.addToDB(_salon_id)
     })

     res.status(201).send("Serviço(s) adicionado(s) com sucesso!")
}

export default createSalonService