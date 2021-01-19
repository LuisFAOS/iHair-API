import Yup from "yup"


async function clientScheduleValidationHandler(clientSchedule) {
     try {
          const dateSchema = Yup.object().shape({
               date: Yup.date("Data do agendamento não está válida")
                    .min(new Date(), "Não é possivel inserir uma data anterior a hoje")
          })

          await dateSchema.validate({
               ...clientSchedule
          })

          const possibleSchedulesStatus = ["EM ABERTO", "FECHADO", "CANCELADO", "FALTOU"]
          if (!possibleSchedulesStatus.includes(clientSchedule.status)) {
               return "Status de agendamento inválido!"
          }

     } catch (error) {
          return error.message
     }
}

export default clientScheduleValidationHandler