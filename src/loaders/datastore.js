const mongoose = require('mongoose')
const config = require('../config/config')

mongoose.connect(config.dbUrl, config.dbOptions)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Сonnection error:'))
db.once('open', () => console.log('Mongo is connected'))

module.exports.db = db
