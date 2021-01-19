import dbHandler from "../../config/knex.js"


async function addSalonServiceInDB(salonServices, salonID) {
     salonServices.forEach(async service => {
          await dbHandler("salonService")
               .insert({
                    ...service,
                    salonID
               })
     })
}

export default addSalonServiceInDB