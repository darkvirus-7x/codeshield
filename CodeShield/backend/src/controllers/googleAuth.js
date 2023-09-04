const sql = require('../config/db').query
const jwt = require('jsonwebtoken')
const config = require('dotenv').config()
const googleAuth = (req,res) => {
    const {name,email,picture} = req.user._json
    sql('SELECT * FROM users WHERE email=?' , [email], (err,data) => {
        if (data.length === 0) {
            sql('INSERT INTO users (username,email,profile_pic,created_at,last_login,role) values (?,?,?,?,?,?)',[name,email,picture,new Date().toLocaleString(),new Date().toLocaleString(),'user'],(err,succ) => {
                if (succ) {
                    jwt.sign({username:name,email,profile: picture,role:'user'},config.parsed.SECRET_KEY,{expiresIn: '30d'},(err,token) => {
                        if (token) {
                            res.cookie('code',token)
                            res.redirect('http://localhost:3000/')
                        }   
                        else console.log(err)
                    })
                }else {
                    if (err.sqlMessage.includes('Duplicate')) {
                        !err.sqlMessage.includes('email') ? res.status(500).send({message: 'The Username is Already defined'}) : res.status(500).send({message: 'The Email is Already defined'}) 
                    }
                }
            })
        }else {
            const {id,username,email,profile_pic,role} = data[0]
            sql('UPDATE users SET last_login=? WHERE id=?',[new Date().toLocaleString(),id],(err,succ) => {
                if (err) console.log(err)
            })
            jwt.sign({id,username,email,profile: profile_pic,role},config.parsed.SECRET_KEY,{expiresIn: '30d'},(err,token) => {
                if(err) console.log(err)
                else { 
                    res.cookie('code',token)
                    res.redirect('http://localhost:3000/')
                }
            })
        }
    })
}

module.exports = googleAuth