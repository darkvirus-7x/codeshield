const Login = require('../controllers/Login')
const cart = require('../controllers/cart')
const Logout = require('../controllers/Logout').logout
const Register = require('../controllers/Register').Register
const changeData = require('../controllers/changeData')
const courses = require('../controllers/courses')
const getMe = require('../controllers/getMe')
const googleAuth = require('../controllers/googleAuth')
const validateUser = require('../middleware/validateUser')
const router = require('express').Router()
const passport = require('passport')

router.post('/login',Login)
router.post('/register',Register)
router.get('/courses',courses)
router.get('/google',passport.authenticate('google',{scope: ['profile','email']}))
router.get('/google/callback',passport.authenticate('google',{failureRedirect: '/'}),googleAuth)
router.get('/getme',validateUser,getMe)
router.post('/changedata',validateUser,changeData)
router.get('/logout',validateUser,Logout)
router.post('/cart',validateUser,cart)
module.exports = router