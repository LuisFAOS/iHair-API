import deleteClientScheduleFromDB from "../../models/clientScheduleModels/deleteClientSchedule.model.js"


async function deleteClientSchedule(req, res) {
     const {
          clientScheduleID
     } = req.body

     await deleteClientScheduleFromDB({
          id: clientScheduleID
     })

     res.status(200).send("Agendamento cancelado com sucesso!")

}

export default deleteClientSchedule