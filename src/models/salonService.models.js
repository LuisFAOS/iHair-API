import dbHandler from "../config/knex.js"


export async function addSalonServiceInDB(salonServices, salonID) {
     salonServices.forEach(async service => {
          await dbHandler("salonService")
               .insert({
                    ...service,
                    salonID
               })
     })
}


export async function deleteSalonServiceFromDB(whereProps) {

    await dbHandler("salonService")
         .delete().where({
              ...whereProps
         })
}


export async function getSalonServiceFromDB(whereProps) {
    const dbResultSelectQuery = await dbHandler("salonService")
         .select("*")
         .where({
              ...whereProps
         })

    return dbResultSelectQuery
}



export async function updateSalonServiceInDB(updatedSalonServiceDatas, whereProps) {
    await dbHandler("salonService")
         .update({
              ...updatedSalonServiceDatas
         })
         .where({
              ...whereProps
         })

}