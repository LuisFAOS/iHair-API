import knex from "knex"

const databaseHandler = knex({
     client: 'mysql2',
     connection: {
          database: 'ihair_db',
          user: 'root',
          host: "localhost",
          password: ''
     },
})

export default databaseHandler;