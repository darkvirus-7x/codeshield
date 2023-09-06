const express = require('express')
const app = express()
const session = require('express-session')
const env = require('dotenv')
const config = env.config().parsed
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const passport = require('passport')
const router = require('./routes/routes')
const DB = require('./config/db')
const cookieParser = require('cookie-parser')
const configOauth2 = require('./config/passport')
const courses = require('./controllers/courses')

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
DB.getConnection()
app.use(session({secret: config.SECRET_KEY,resave: false,saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())
configOauth2()
app.use(fileUpload())
app.use('/api',router)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/courseimg',express.static(path.join(__dirname,'image_courses')))
app.get('/courses/',courses)

const port  = +config.PORT || 8000
app.listen(port,'0.0.0.0',() => {
    console.log(`Server Started on port ${port}`)
})