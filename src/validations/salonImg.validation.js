import salonImgSchema from "./schemas/salonImg.schema"


async function salonImgValidationHandler(salonImgsInBase64) {
     try {
          if (!salonImgsInBase64 || salonImgsInBase64.length < 3)
               return "Você deve inserir pelo menos 3 imagens do seu salão!"

          for (var i = 0; i <= salonImgsInBase64.length - 1; i++) {
               const matchesBlobImg = salonImgsInBase64[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

               await salonImgSchema.validate({
                    salonImg: matchesBlobImg[2]
               })
          }
     } catch (error) {
          return error.message
     }
}

export default salonImgValidationHandler