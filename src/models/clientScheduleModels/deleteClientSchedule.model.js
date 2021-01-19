import dbHandler from "../../config/knex.js"


async function deleteClientScheduleFromDB(whereProps) {
     await dbHandler("clientSchedule")
          .delete()
          .where({
               ...whereProps
          })

}

export default deleteClientScheduleFromDB