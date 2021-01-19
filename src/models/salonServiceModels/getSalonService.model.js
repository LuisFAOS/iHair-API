import dbHandler from "../../config/knex.js"


async function getSalonServiceFromDB(whereProps) {
     const dbResultSelectQuery = await dbHandler("salonService")
          .select("*")
          .where({
               ...whereProps
          })

     return dbResultSelectQuery
}

export default getSalonServiceFromDB