require('dotenv').config() // Sets up dotenv as soon as our application starts

const express = require('express')
const logger = require('morgan')
const config = require('./config')[process.env.NODE_ENV || 'development']

const log = config.log()

const routes = require('./routes/index.js')

const app = express()
const router = express.Router()

const environment = process.env.NODE_ENV || 'development'
const stage = require('./config')[environment]

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

if (environment !== 'production') {
  app.use(logger('dev'))
}

app.use('/api/v1', routes(router))

app.listen(`${stage.port}`, () => {
  log.info(`Server now listening at localhost:${stage.port}`)
})

module.exports = app
