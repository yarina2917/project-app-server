const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

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

app.listen(process.env.PORT || config.PORT, () => {
    console.log(`Server works on port ${process.env.PORT || config.PORT}`)
})
