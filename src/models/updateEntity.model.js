import dbHandler from "../config/knex.js"

async function updateEntityInDB(entityName, updatedEntityDatas, whereProps) {
     await dbHandler(entityName)
          .update({
               ...updatedEntityDatas
          })
          .where({
               ...whereProps
          })
}

export default updateEntityInDB