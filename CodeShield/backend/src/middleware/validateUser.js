const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const blackList = require('../controllers/Logout').blackList
const validateUser = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        if (!blackList.includes(token)) {
            jwt.verify(token,env.parsed.SECRET_KEY,(err,data) => {
                if (data) {
                    req.data = {...data,exp:undefined,iat:undefined}
                    next()
                }else {
                    res.status(403).send({message:'Invalid token'})
                }
            })
        }else {
            res.status(403).send({message:'Invalid token'})
        }
    }
};

module.exports = validateUser;
