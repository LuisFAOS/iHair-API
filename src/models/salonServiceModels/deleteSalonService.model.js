import dbHandler from "../../config/knex.js"


async function deleteSalonServiceFromDB(whereProps) {

     await dbHandler("salonService")
          .delete().where({
               ...whereProps
          })
}

export default deleteSalonServiceFromDB