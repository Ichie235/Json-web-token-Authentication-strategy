const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken');

var cookieParser = require('cookie-parser')
require('dotenv').config()

const db = require('./db')

const authenticationRoute = require('./routes/authentication');

const {checkToken} = require('./middleware/checkAuth')

const PORT = process.env.PORT || 3000
const app = express()


//connect to MongoDB

db.connectToDatabase()


//initializing middleware to access static flies from public folder
app.use(express.static('public'))
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.urlencoded())
app.use(express.json());


app.use(cookieParser())

require("./controller/auth")
app.use('/auth', authenticationRoute);


app.get('/',(req,res)=>{
    res.render('index')
})


app.get('/welcome',passport.authenticate('jwt', { session: false }),(req,res)=>{
   res.render('booksTitle')
})

// Alternatively the checkToken can be used without passport

//app.get('/welcome',checkToken)

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:${PORT}`)
})