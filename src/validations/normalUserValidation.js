import cepPromise from "cep-promise"
import normalUserSchema from "./schemas/normalUserSchema.js"

async function normalUserValidationHandler(userDatas) {
     try {
          await normalUserSchema.validate({
               ...userDatas
          })
          await cepPromise(userDatas.CEP)
     } catch (error) {
          return error.message
     }
}

export default normalUserValidationHandler