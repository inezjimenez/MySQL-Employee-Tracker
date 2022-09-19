const mysql = require('mysql')

//Connecting to database
const connection = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'company',
        socketPath: '/tmp/mysql.sock'
    },
    console.log('Connected to the company database.')
)

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('connected to mysql server')
})

module.exports = connection;