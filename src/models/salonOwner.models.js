import dbHandler from "../config/knex.js"

export async function addSalonOwnerToDB(sOwnerDatas) {
     await dbHandler("salonOwner")
          .insert({
               ...sOwnerDatas
          })
}

export async function getSalonOwnerFromDB(whereProps) {
     const selectQueryResult = await dbHandler("salonOwner")
          .select("completeName", "phone", "email", "profileImgUrl", "certificateImgUrl", "createdAt")
          .where({
               ...whereProps
          })

     return selectQueryResult[0];
}

export async function getSalonOwnerAllDatasFromDB(whereProps) {
     const selectQueryResult = await dbHandler("salonOwner")
          .select("*")
          .where({
               ...whereProps
          })

     return selectQueryResult[0];
}

export async function updateSalonOwnerInDB(updatedOwnerDatas, ownerID) {
     await dbHandler("salonOwner")
          .update({
               ...updatedOwnerDatas
          })
          .where(ownerID)
}