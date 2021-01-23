import dbHandler from "../config/knex.js"


export async function addClientScheduleInDB(clientSchedule, salonID, salonServiceID, normalUserID) {
     await dbHandler("clientSchedule")
          .insert({
               ...clientSchedule,
               ...salonID,
               salonServiceID,
               normalUserID
          })

}


export async function deleteClientScheduleFromDB(whereProps) {
    await dbHandler("clientSchedule")
         .delete()
         .where({
              ...whereProps
         })
}


export async function getClientScheduleFromDB(whereProps) {
    const dbResultSelectQuery = await dbHandler("clientSchedule")
         .select("*")
         .where({
              ...whereProps
         })

    return dbResultSelectQuery
}


export async function updateClientScheduleInDB(updatedClientSchedule, salonID, scheduleID) {
    await dbHandler("clientSchedule")
            .update({
                ...updatedClientSchedule
            })
            .where({
                ...salonID, 
                id: scheduleID
            })
}