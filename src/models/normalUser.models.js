import dbHandler from "../config/knex.js"



export async function addNormalUserToDB(userDatas) {
    await dbHandler("normalUser").insert({
         ...userDatas,
         isVerified: false
    })
    return "Usuário salvo!";
}

export async function deleteNormalUserFromDB(userID) {
    await dbHandler("normalUser")
         .delete().where({
              id: userID
         })
}

export async function getNormalUserFromDB(whereProps) {
    const selectQueryResult = await dbHandler("normalUser")
         .select("*")
         .where({
              ...whereProps
         })

    return selectQueryResult[0];
}

export async function updateNormalUserInDB(updatedUserDatas, userId) {
    await dbHandler("normalUser")
         .update({
              ...updatedUserDatas
         })
         .where({
              id: userId
         })
}