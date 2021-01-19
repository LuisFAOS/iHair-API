import dbHandler from "../../config/knex.js"


async function deleteSalonServiceFromDB(salonServiceID) {
     await dbHandler("salonService")
          .delete().where({
               id: salonServiceID
          })
}

export default deleteSalonServiceFromDB