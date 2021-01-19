import dbHandler from "../../config/knex.js"

async function addSalonOwnerToDB(sOwnerDatas) {
     await dbHandler("salonOwner")
          .insert({
               ...sOwnerDatas
          })
}

export default addSalonOwnerToDB