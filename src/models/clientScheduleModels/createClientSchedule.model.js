import dbHandler from "../../config/knex.js"


async function addClientScheduleInDB(clientSchedule, salonID, salonServiceID, normalUserID) {
     await dbHandler("clientSchedule")
          .insert({
               ...clientSchedule,
               salonID,
               salonServiceID,
               normalUserID
          })

}


export default addClientScheduleInDB