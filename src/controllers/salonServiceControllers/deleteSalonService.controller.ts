
import SalonService from "../../models/salonService.models"
import Salon from "../../models/salon.models"

import jwtDecoder from "../../libs/JWT/jwtDecoder"


async function deleteSalonService(req, res) {
     const authToken = req.headers["authorization"] || req.headers["token"]
     const { id: clientID } = await jwtDecoder(authToken)
     
     const { id: _salon_id } = await Salon.getFromDB({
          _salon_owner_id: clientID
     })

     const {_service_id} = req.body

     if(!_service_id) return res.status(400).send("ID do serviço vázio!") 
     
     await SalonService.deleteFromDB({id: _service_id, _salon_id})

     return res.status(200).send("Serviço deletado com sucesso!")
}

export default deleteSalonService