const mysql = require('mysql')
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '147896321',
    database : 'topic'
})

module.exports = {
    connection : connection
}