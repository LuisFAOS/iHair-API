import cepPromise from "cep-promise"
import {
     cnpj
} from "cpf-cnpj-validator"
import salonSchema from "./schemas/salon.schema.js"

async function salonValidationHandler(salonDatas) {
     try {
          await cepPromise(salonDatas.CEP)
          const isValidCNPJ = await cnpj.isValid(salonDatas.CNPJ)
          if (!isValidCNPJ)
               return "CNPJ inválido, tente outro!"
          await salonSchema.validate({
               ...salonDatas
          })
     } catch (error) {
          return error.message
     }

}

export default salonValidationHandler