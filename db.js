require('dotenv').config();
const sql = require('mysql2')

const connection = sql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
})

module.exports = connection;