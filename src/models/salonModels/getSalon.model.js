import dbHandler from "../../config/knex.js"


async function getSalonFromDB(whereProps) {
     const resultQuerySelect = await dbHandler("salon")
          .select("*").where({
               ...whereProps
          })

     return resultQuerySelect[0]
}

export default getSalonFromDB