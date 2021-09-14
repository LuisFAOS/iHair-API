import openingHoursSchema from "./schemas/openingHours.schema"

async function openingHoursValidationHandler(openingHoursArray) {
     try {
          if (openingHoursArray && openingHoursArray.length == 7) {
               for (let i = 0; i < openingHoursArray.length; i++) {
                    let workPeriod = openingHoursArray[i]
                    if (!(workPeriod === "FECHADO") && Array.isArray(openingHoursArray)) {
                    
                         if(workPeriod.length % 2 !== 0){
                              return 'Periodo inválido.'
                         }

                         for (let index = 0; index < workPeriod.length; index++){
                              const time = workPeriod[index]

                              await openingHoursSchema.validate({
                                   time
                              })

                              const hour = parseInt(time.split(":")[0])
                              const minute = parseInt(time.split(":")[1])
                              
                              if(!(hour >= 0 && hour <= 23)){
                                   return "Hora inválida."
                              }

                              if(index > 0){
                                   const lastHour = parseInt(workPeriod[index-1].split(":")[0])
                                   const lastMinute = parseInt(workPeriod[index-1].split(":")[1])

                                   if(!(lastHour < hour || (lastHour === hour && lastMinute < minute))){
                                        return "Periodo inválido."
                                   }
                              }
                         }

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