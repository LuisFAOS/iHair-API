import dbHandler from "../../config/knex.js"

async function updateSalonInDB(updatedSalonDatas, whereProps) {
     await dbHandler("salon")
          .update({
               ...updatedSalonDatas
          })
          .where({
               ...whereProps
          })
}

export default updateSalonInDB