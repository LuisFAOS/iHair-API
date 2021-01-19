import dbHandler from "../../config/knex.js"

async function addNormalUserToDB(userDatas) {
     await dbHandler("normalUser").insert({
          ...userDatas,
          isVerified: false
     })
     return "Usuário salvo!";
}

export default addNormalUserToDB;