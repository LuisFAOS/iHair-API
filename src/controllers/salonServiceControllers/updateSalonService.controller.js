import salonServiceValidationHandler from "../../validations/salonService.validation.js"

import updateSalonServiceInDB from "../../models/salonServiceModels/updateSalonService.model.js"

async function updateSalonService(req, res) {
     const {
          salonServiceDatas,
          serviceID
     } = req.body

     const validSalonServiceDatas = await salonServiceValidationHandler(salonServiceDatas)
     if (validSalonServiceDatas) {
          res.status(400).send(validSalonServiceDatas)
          return
     }
     await updateSalonServiceInDB(salonServiceDatas, serviceID)

     res.status(202).send("Dados atualizado com sucesso!")
}

export default updateSalonService