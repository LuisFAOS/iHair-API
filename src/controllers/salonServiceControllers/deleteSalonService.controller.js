import deleteSalonServiceFromDB from "../../models/salonServiceModels/deleteSalonService.model.js"


async function deleteSalonService(req, res) {
     const {
          serviceID
     } = req.body

     await deleteSalonServiceFromDB(serviceID)

     res.status(200).send("Serviço deletado com sucesso!")
}

export default deleteSalonService