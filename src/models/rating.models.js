import dbHandler from '../config/knex.js'


export async function addRatingInDB(datas){
    await dbHandler("rating")
        .insert({
            ...datas
        })
}   


export async function getRatingsFromDB(whereProps){
    const dbResultSelectQuery = await dbHandler("rating")
        .select("*")    
        .where({
            ...whereProps
        })

    return dbResultSelectQuery
}   
