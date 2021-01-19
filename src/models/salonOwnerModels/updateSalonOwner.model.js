import dbHandler from "../../config/knex.js"

async function updateSalonOwnerInDB(updatedsOwnerDatas, sOwnerID) {

     await dbHandler("salonOwner")
          .update({
               ...updatedsOwnerDatas
          })
          .where(sOwnerID)
}

export default updateSalonOwnerInDB