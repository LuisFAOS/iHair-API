import salonOwnerSchema from "./schemas/salonOwner.schema"
import base64Schema from "./schemas/base64.schema"

async function salonOwnerValidationBuilder(){

}

async function salonOwnerValidationHandler(sOwnerDatas, isUpdate) {
     try {
          if(!isUpdate){
               const matchesBlobImg = sOwnerDatas.imgs.profileImgInBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
               
               await base64Schema.validate({
                    imgInBase64: matchesBlobImg[2]
               })
          }
          await salonOwnerSchema.validate({
               ...sOwnerDatas,
          })
     } catch (error) {
          return error.message;
     }
}

export default salonOwnerValidationHandler;