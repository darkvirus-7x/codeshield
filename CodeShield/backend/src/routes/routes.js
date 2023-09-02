const Login = require('../controllers/Login')
const Logout = require('../controllers/Logout').logout
const Register = require('../controllers/Register')
const getMe = require('../controllers/getMe')
const googleAuth = require('../controllers/googleAuth')
const validateUser = require('../middleware/validateUser')
const router = require('express').Router()
const passport = require('passport')

router.post('/login',Login)
router.post('/register',Register)
router.get('/google',passport.authenticate('google',{scope: ['profile','email']}))
router.get('/google/callback',passport.authenticate('google',{failureRedirect: '/'}),googleAuth)
router.get('/getme',validateUser,getMe)
router.get('/logout',validateUser,Logout)
module.exports = router