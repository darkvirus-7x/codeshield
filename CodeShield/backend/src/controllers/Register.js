const jwt = require('jsonwebtoken')
const sql = require('../config/db').query
const bcrypt = require('bcrypt')
const config = require('dotenv').config()
const {dirname} = require('path')
const crypto = require('crypto')

const UploadFile = (file) => {
    if (!file) {
        return null;
    }else {
        const profile = file.profile
        const name = `${crypto.randomBytes(10).toString('hex')}.${profile.mimetype.split('/')[profile.mimetype.split('/').length - 1]}`
        const path = `${dirname(require.main.filename)}\\uploads\\${name}`
        profile.mv(path,(err) => {
            err && console.log(err)
        })
        return `http://localhost:8000/uploads/${name}`
    }
}

const Register = (req, res) => {
    const { username, email, password } = req.body;
    const file = UploadFile(req.files);
    const data = {
        username,
        email,
        password,
        file,
        created_at: new Date().toLocaleString(),
        last_login: new Date().toLocaleDateString(),
        role: 'user'
    };
    if (username && email && password) {
        bcrypt.hash(data.password,10,(err,hash) => {
            if (hash) {
                sql('INSERT INTO users (username,email,password,profile_pic,created_at,last_login,role) values (?,?,?,?,?,?,?)',[data.username,data.email,hash,data.file,data.created_at,data.last_login,data.role],(err,succ) => {
                    if (succ) {
                        jwt.sign({username,email,profile:data.file,role: data.role},config.parsed.SECRET_KEY,{expiresIn: '30d'},(err,token) => {
                            if (token) {
                                res.status(201).send({
                                    message: 'Account Created',
                                    data: {...data, password: undefined,token}
                                })
                            }   
                            else console.log(err)
                        })
                    }else {
                        if (err.sqlMessage.includes('Duplicate')) {
                            !err.sqlMessage.includes('email') ? res.status(500).send({message: 'The Username is Already defined'}) : res.status(500).send({message: 'The Email is Already defined'}) 
                        }
                    }
                })
            }
        })
    }else {
        res.status(500).send({message: 'Field Required'})
    }
}

module.exports = Register;
