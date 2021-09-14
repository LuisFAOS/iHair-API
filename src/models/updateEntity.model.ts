import database from "../libs/knex"

async function updateEntityInDB(tableName: string, updatedEntityData: object, whereProps: object) {
     await database(tableName)
        .update({
            ...updatedEntityData
        })
        .where({
            ...whereProps
        })
}

export default updateEntityInDB
