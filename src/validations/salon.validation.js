import cepPromise from "cep-promise"
import {
     cnpj
} from "cpf-cnpj-validator"
import salonSchema from "./schemas/salon.schema"
import base64Schema from "./schemas/base64.schema"

async function salonValidationHandler(salonDatas, isUpdate) {
     try {
          await cepPromise(salonDatas.CEP)

          const isValidCNPJ = await cnpj.isValid(salonDatas.CNPJ)
          if (!isValidCNPJ)
               return "CNPJ inválido, tente outro!"

          if(!isUpdate){ 
               const matchesBlobImg = salonDatas.bannerImgInBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

               await base64Schema.validate({
                    imgInBase64: matchesBlobImg[2]
               })
          }

          await salonSchema.validate({
               ...salonDatas,
          })
     } catch (error) {
          return error.message
     }
}

export default salonValidationHandler