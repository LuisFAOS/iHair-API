import database from '../libs/knex'

async function createEntityInDB(tableName: string, whereProps: object, entityData: object){
    await database(tableName)
        .insert({
            ...entityData
        }).where({
            ...whereProps
        })
}

export default createEntityInDB
