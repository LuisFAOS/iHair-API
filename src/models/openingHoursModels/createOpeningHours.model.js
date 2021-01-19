import dbHandler from "../../config/knex.js"

async function addOpeningHoursInDB(openingHours, salonID) {
     openingHours.forEach(async (period, indexDaysWeek) => {
          await dbHandler("openingHours").insert({
               indexDaysWeek,
               period,
               salonID
          })
     })
}

export default addOpeningHoursInDB