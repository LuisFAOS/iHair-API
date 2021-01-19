import dbHandler from "../../config/knex.js"

async function getAllSalonsFromDB() {
     const resultQuerySelect = await dbHandler("salon").select("*")
     return resultQuerySelect
}

export default getAllSalonsFromDB