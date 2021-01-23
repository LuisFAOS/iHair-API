import Yup from "yup"


async function clientScheduleValidationHandler(clientSchedule) {
     try {
          const today = new Date()
          today.setMinutes(today.getMinutes() + 10)
          const dateSchema = Yup.object().shape({
               scheduleDate: Yup.date("Data do agendamento não está válida")
                    .min(today, "Data muito proxima! Por favor, insira outra")
                    .required("Data do agendamento obrigatoria")
          })

          await dateSchema.validate({
               ...clientSchedule
          })

     } catch (error) {
          return error.message
     }
}

export default clientScheduleValidationHandler