const jwt = require('jsonwebtoken')

const blackList = []
const Logout = (req,res) => {
    const token = req.headers.authorization
    blackList.push(token)
    res.send(200)
}

module.exports = {
    logout: Logout,
    blackList
}