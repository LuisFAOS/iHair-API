import dbHandler from "../config/knex.js"

export async function addOpeningHoursInDB(openingHours, salonID) {
     openingHours.forEach(async (period, indexDaysWeek) => {
          await dbHandler("openingHours").insert({
               indexDaysWeek,
               period,
               salonID
          })
     })
}


export async function getOpeningHoursFromDB(whereProps) {
    const resultQuerySelect = await dbHandler("openingHours")
         .select("*")
         .where({
              ...whereProps
         })

    return resultQuerySelect
}


export async function updateOpeningHoursInDB(updatedOpeningHoursDatas, whereProps) {
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