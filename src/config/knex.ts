export default {
     client: 'mysql2',
     connection: {
          database: 'ihair_db',
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          password: process.env.DB_PASS,
     }
}