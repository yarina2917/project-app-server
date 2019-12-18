const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const errorHandler = require('./services/error-handling/error-handler-middleware')
const config = require('./config/config')
const users = require('./api-routes/users')
require('./loaders/datastore')

const adminFilePath = '/admin/dist/admin'
const path = require('path')

// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname + adminFilePath))
// })

app.use(cors())
app.use(compression())
app.use(bodyParser.json())

app.use('/users', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error(`Not Found ${req.path}`)
    err.status = 404
    next(err)
})

app.use(errorHandler)

app.listen(process.env.PORT || config.PORT, () => {
    console.log(`Server works on port ${process.env.PORT || config.PORT}`)
})
