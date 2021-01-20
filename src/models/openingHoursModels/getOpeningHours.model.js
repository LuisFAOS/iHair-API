import dbHandler from "../../config/knex.js"


async function getOpeningHoursFromDB(whereProps) {
     const resultQuerySelect = await dbHandler("openingHours")
          .select("*")
          .where({
               ...whereProps
          })

     return resultQuerySelect
}

export default getOpeningHoursFromDB