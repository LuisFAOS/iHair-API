import dbHandler from "../config/knex.js"


export async function addSalonImgsInDB(salonImgsUrl, salonID) {
     salonImgsUrl.forEach(async url => {
          await dbHandler("salonImgs").insert({
               url,
               salonID
          })
     })
}


export async function addSalonInDB(salonDatas, salonOwnerID) {
    const {
         CEP,
         addressNumber,
         name,
         salonDescription,
         CNPJ,
         contactPhone,
         createdAt,
         bannerImgUrl
    } = salonDatas

    await dbHandler("salon").insert({
         CEP,
         addressNumber,
         name,
         salonDescription,
         CNPJ,
         contactPhone,
         createdAt,
         bannerImgUrl,
         salonOwnerID
    })
}



export async function getAllSalonsFromDB() {
    const resultQuerySelect = await dbHandler("salon").select("*")
    return resultQuerySelect
}


export async function getSalonFromDB(whereProps) {
    const resultQuerySelect = await dbHandler("salon")
         .select("*").where({
              ...whereProps
         })

    return resultQuerySelect[0]
}


export async function updateSalonInDB(updatedSalonDatas, whereProps) {
    await dbHandler("salon")
         .update({
              ...updatedSalonDatas
         })
         .where({
              ...whereProps
         })
}