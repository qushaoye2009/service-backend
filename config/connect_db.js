const mysql = require('mysql');
const dev = require('../config/config.dev.js')
const pro = require('../config/config.pro.js')
const config = (process.env.NODE_ENV === 'production') ? pro : dev
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
})
const query = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            console.log(sql)
            if (err) {
                return resolve(err)
            } else {
                connection.query(sql, val, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
configInfo = {
    pool: pool,
    jwt_secret: config.jwt_secret,
    query: query
}
module.exports = configInfo
