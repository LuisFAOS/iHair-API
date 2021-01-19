import dbHandler from "../../config/knex.js"

async function deleteNormalUserFromDB(userID) {
     await dbHandler("normalUser")
          .delete().where({
               id: userID
          })
}

export default deleteNormalUserFromDB