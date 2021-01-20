import dbHandler from "../../config/knex.js"


function updateOpeningHoursInDB(updatedOpeningHoursDatas, whereProps) {
     updatedOpeningHoursDatas.forEach(async (period, indexDaysWeek) => {
          await dbHandler("openingHours")
               .update({
                    period
               })
               .where({
                    ...whereProps,
                    indexDaysWeek
               })
     })
}

export default updateOpeningHoursInDB