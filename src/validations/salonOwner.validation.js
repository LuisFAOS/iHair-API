import salonOwnerSchema from "./schemas/salonOwner.schema.js"

async function salonOwnerValidationHandler(sOwnerDatas) {
     try {

          const matchesBlobImg = sOwnerDatas.imgs.profileImgInBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

          await salonOwnerSchema.validate({
               ...sOwnerDatas,
               profileImgInBase64: matchesBlobImg[2]
          })

          //const profileImgRegEx = new RegExp('^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$')

     } catch (error) {
          return error.message;
     }
}

export default salonOwnerValidationHandler;