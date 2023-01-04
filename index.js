const express = require('express')
const bodyParser = ('body-parser')
const passport = require('passport')

require('dotenv').config()

const db = require('./db')

const authenticationRoute = require('./routes/authentication');

const PORT = process.env.PORT || 3000
const app = express()


//connect to MongoDB

db.connectToDatabase()

require("./controller/auth")

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.urlencoded())
app.use(express.json());

app.use('/auth', authenticationRoute);

app.get('/',passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.status(200).send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:${PORT}`)
})