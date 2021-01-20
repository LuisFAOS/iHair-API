import openingHoursSchema from "./schemas/openingHours.schema.js"

async function openingHoursValidationHandler(openingHoursArray) {
     try {
          if (openingHoursArray && openingHoursArray.length == 7) {
               for (var i = 0; i <= openingHoursArray.length; i++) {
                    const workPeriod = openingHoursArray[i]
                    if (workPeriod !== "fechado") {
                         await openingHoursSchema.validate({
                              workPeriod
                         })
                    }
               }
          } else {
               return "Você deve inserir seu periodo de trabalho nos 7 dias da semana"
          }
     } catch (error) {
          return error.message
     }
}

export default openingHoursValidationHandler