import dbHandler from "../../config/knex.js"

async function updateSalonServiceInDB(updatedSalonServiceDatas, salonID) {
     await dbHandler("salonService")
          .update({
               ...updatedSalonServiceDatas
          })
          .where({
               salonID
          })

}

export default updateSalonServiceInDB