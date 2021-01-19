import dbHandler from "../../config/knex.js"

async function updateNormalUserDB(updatedUserDatas, userId) {
     await dbHandler("normalUser")
          .update({
               ...updatedUserDatas
          })
          .where({
               id: userId
          })
}

export default updateNormalUserDB