const mysql = require('mysql2')

//Connecting to database
const connection = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'company'
    },
    console.log('Connected to the company database.')
)

module.exports = connection;