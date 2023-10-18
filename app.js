const express = require('express')
const logger = require('morgan')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config({path: `env/.env.${process.env.NODE_ENV}`})

const routes = require('./src/routes/routes')

// Initiating the app
const app = express()

// Using logger as a middleware
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(process.env.BASE_URL, routes)

// Connecting to mongodb server
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
    .on('error', (err) => { console.log("MangoDB connection failed.", err) })
    .on('open', () => { console.log("MongoDB connection successful.") })

module.exports = app