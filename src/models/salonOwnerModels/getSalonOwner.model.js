import dbHandler from "../../config/knex.js"

async function getSalonOwnerFromDB(whereProps) {
     const selectQueryResult = await dbHandler("salonOwner")
          .select("completeName", "phone", "email", "profileImgUrl", "certificateImgUrl", "createdAt")
          .where({
               ...whereProps
          })

     return selectQueryResult[0];
}

async function getSalonOwnerAllDatasFromDB(whereProps) {
     const selectQueryResult = await dbHandler("salonOwner")
          .select("*")
          .where({
               ...whereProps
          })

     return selectQueryResult[0];
}

export {
     getSalonOwnerFromDB,
     getSalonOwnerAllDatasFromDB
}