const jwt = require('jsonwebtoken')
const sql = require('../config/db').query
const bcrypt = require('bcrypt')
const config = require('dotenv').config()

const Login = (req,res) => {
    const {email,password} = req.body
    if (email && password) {
        sql('SELECT * FROM users WHERE email=?',[email], (err,data) => {
            if (err) res.send('Something Went Wrong')
            else if(data.length !== 0) {
                const {id,username,email,profile_pic,role} = data[0]
                bcrypt.compare(password,data[0].password,(err,succ) => {
                    if (succ) {
                        jwt.sign({username,email,profile_pic,role},config.parsed.SECRET_KEY,{expiresIn: '30 days'},(err,token) => {
                            if (err) {console.log(err);res.send('Something went wrong')}
                            else {
                                sql('UPDATE users SET last_login=? WHERE id=?',[new Date().toLocaleString(),id],(err,succ) => {
                                    if (err) console.log(err)
                                })
                                res.send({
                                    message:'Credentials Correct',
                                    token,
                                    data : {
                                        username,
                                        email,
                                        profile_pic,
                                        role,
                                    }
                                })
                            }
                        })
                    }else {
                        res.status(404).send({message: 'Email/Password Incorrect'})
                    }
                })
            }else {
                res.status(404).send({message: 'Email/Password Incorrect'})
            }
        })
    }else {
        res.send('Fields Required')
    }
}

module.exports = Login