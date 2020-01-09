const mongoose = require('mongoose')
const config = require('../config/config')

module.exports.connect = () => new Promise((resolve, reject) => {
  mongoose.connect(config.dbUrl, config.dbOptions, (err) => {
    if (err) {
      console.error(err)
      return reject(err)
    }
    console.log('Mongo is connected')
    resolve(mongoose)
  })
})
