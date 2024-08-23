const sql = require('mysql2')

const connection = sql.createConnection({
    host: 'localhost',
    database: 'SCHOOL',
    user: 'root',
    password: 'Gomagni@123'
})

module.exports = connection;