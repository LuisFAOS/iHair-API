import dbHandler from "../../config/knex.js"


async function getOpeningHoursFromDB(whereProps) {
     await dbHandler("openingHours")
          .select("*")
          .where({
               ...whereProps
          })
}

export default getOpeningHoursFromDB