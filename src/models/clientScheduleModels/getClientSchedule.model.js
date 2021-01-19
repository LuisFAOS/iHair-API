import dbHandler from "../../config/knex.js"


async function getClientScheduleFromDB(whereProps) {
     const dbResultSelectQuery = await dbHandler("clientSchedule")
          .select("*")
          .where({
               ...whereProps
          })

     return dbResultSelectQuery
}


export default getClientScheduleFromDB