const express = require('express')
const bodyParser = ('body-parser')
const passport = require('passport')

require('dotenv').config()

const db = require('./db')

const PORT = process.env.PORT || 3000
const app = express()


//connect to MongoDB

db.connectToDatabase()


app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:${PORT}`)
})