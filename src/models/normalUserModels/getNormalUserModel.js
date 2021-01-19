import dbHandler from "../../config/knex.js";


async function getNormalUserFromDB(whereProps) {
     const selectQueryResult = await dbHandler("normalUser")
          .select("*")
          .where({
               ...whereProps
          })

     return selectQueryResult[0];
}

export default getNormalUserFromDB