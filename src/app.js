const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
require('dotenv').config()

const errorHandler = require('./services/error-handling/error-handler-middleware')
const { HttpError } = require('./services/error-handling/http.errors')
const config = require('./config/config')
const users = require('./api-routes/users')
require('./loaders/datastore')

const path = require('path')

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', config.adminFilePath))
// })

app.use(cors())
app.use(compression())
app.use(bodyParser.json())

app.use('/users', users)

app.use((req, res, next) => {
    next(new HttpError(`Not Found ${req.path}`, 404))
})

app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server works on port ${config.port}`)
})
