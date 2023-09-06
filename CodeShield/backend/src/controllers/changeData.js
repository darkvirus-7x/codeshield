const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('dotenv').config().parsed
const sql = require('../config/db').query
const UploadFile = require('./Register').UploadFile
const changeData = (req,res) => {
    const body = req.body
    const oldData = req.data
    const profile = req.files
    if (profile) {var file = UploadFile(profile)}
    console.log(file)
    const newData = {
        username: body.username || oldData.username,
        email: body.email || oldData.email,
        profile: file || oldData.profile_pic,
        oldpassword: body.oldpassword,
        password: body.newpassword
    }
    console.log(newData)
    const insertNewData = (password) => {
        if (newData.oldpassword && newData.password) {
            bcrypt.compare(newData.oldpassword,password,(err,succ) => {
                if (succ) {
                    bcrypt.hash(newData.password,10,(err,hash) => {
                        if (hash) {
                            sql('UPDATE users SET username=?, email=?, profile_pic=?, password=? WHERE id=?',[newData.username,newData.email,newData.profile,hash,oldData.id],(err,succ) => {
                                if (succ) {
                                    jwt.sign({...newData,password: undefined,oldpassword: undefined,id:oldData.id},config.SECRET_KEY,(err,token) => {
                                        if (token) {
                                            res.send({
                                                message: 'Data changed success',
                                                token
                                            })
                                        }else {
                                            res.status(500).send({
                                                message: 'Something Went Wrong'
                                            })
                                        }
                                    })
                                }else {
                                    res.status(500).send({
                                        message: err.sqlMessage.includes('Duplicate') ? err.sqlMessage.includes('username') ? 'Usernmae is Already used' : 'Email is Already used' : 'Something went wrong'
                                    })
                                }
                            })
                        }else {
                            console.log(err)
                            res.status(500).send({message: 'Something Went Wrong'})
                        }
                    }) 
                }else {
                    res.status(403).send({message:'The password is Incorrect'})
                }
            })
        }else {
            sql('UPDATE users SET username=?, email=?, profile_pic=? WHERE id=?',[newData.username,newData.email,newData.profile,oldData.id],(err,succ) => {
                if (succ) {
                    jwt.sign({...newData,id:oldData.id},config.SECRET_KEY,(err,token) => {
                        if (token) {
                            res.send({
                                message: 'Data changed success',
                                token
                            })
                        }else {
                            console.log(err)
                            res.status(500).send({
                                message: 'Something Went Wrong'
                            })
                        }
                    })
                }else {
                    res.status(500).send({
                        message: err.sqlMessage.includes('Duplicate') ? err.sqlMessage.includes('username') ? 'Usernmae is Already used' : 'Email is Already used' : 'Something went wrong'
                    })
                }
            })
        }
    }
    const getOldPassword = (id) => {
        sql('SELECT * FROM users WHERE id=?', [id], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Something Went Wrong' });
            } else if (data && data.length > 0) {
                insertNewData(data[0].password);
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        });
    };
    getOldPassword(oldData.id)
}

module.exports = changeData