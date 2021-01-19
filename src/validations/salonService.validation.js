import salonServiceSchema from "./schemas/salonService.schema.js"


async function salonServiceValidationHandler(salonServicesArray) {
     try {
          if (!salonServicesArray)
               return "Você precisa inserir os serviços do salão!"

          for (var i = 0; i <= salonServicesArray.length - 1; i++) {
               await salonServiceSchema.validate({
                    ...salonServicesArray[i]
               })
          }
     } catch (error) {
          return error.message
     }
}

export default salonServiceValidationHandler