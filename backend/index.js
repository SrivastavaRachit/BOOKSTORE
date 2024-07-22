import express from 'express'
import mongoose from 'mongoose';

import bookRoute from './route/book.route.js'
import userRoute from './route/user.route.js'

import cors from 'cors'

const app = express()
app.use(cors())

app.use(express.json())

import dotenv from 'dotenv'
// const dotenv = require("dotenv")
dotenv.config();

const PORT = process.env.PORT || 4000
const connectDb = process.env.MongoDb;

// CONNECTION TO MONGO DB
try {
    mongoose.connect(connectDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("Connected To DB")
}
catch (error) {
    console.log("Error:", error);
}

// DEFINING ROUTES
app.use('/book', bookRoute)
app.use('/user', userRoute)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})