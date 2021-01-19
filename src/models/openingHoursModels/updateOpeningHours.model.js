import dbHandler from "../../config/knex.js"


async function updateOpeningHoursInDB(updatedOpeningHoursDatas, whereProps) {
     await dbHandler("openingHours")
          .update({
               ...updatedOpeningHoursDatas
          })
          .where({
               ...whereProps
          })
}

export default updateOpeningHoursInDB