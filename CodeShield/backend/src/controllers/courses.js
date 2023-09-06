const sql = require('../config/db').query

const courses = (req,res) => {
    sql('SELECT * FROM courses',[],(err,data) => {
        res.send(data)
    })
}

module.exports = courses