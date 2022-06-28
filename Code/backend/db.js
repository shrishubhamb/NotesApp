const mysql = require('mysql')

const pool = mysql.createPool({
  host: 'database',
  user: 'root',
  password: 'root',
  database: 'mydb',
  connectionLimit: 100,
})

module.exports = {
  pool,
}
