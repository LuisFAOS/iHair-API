import dbHandler from "../../config/knex.js"


async function addSalonInDB(salonDatas, salonOwnerID) {
     const {
          CEP,
          addressNumber,
          salonName,
          salonDescription,
          CNPJ,
          contactPhone,
          createdAt,
          bannerImgUrl
     } = salonDatas

     await dbHandler("salon").insert({
          CEP,
          addressNumber,
          salonName,
          salonDescription,
          CNPJ,
          contactPhone,
          createdAt,
          bannerImgUrl,
          salonOwnerID
     })
}

export default addSalonInDB