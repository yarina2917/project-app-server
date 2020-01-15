'use strict'

const base = require('../src/loaders/datastore')
const User = require('../src/models/user').User

module.exports.up = (next) => {
  base.connect()
    .then(db => {
      const userData = {
        firstName: 'test',
        lastName: 'test',
        email: 'test@test.com',
        password: 'testtest',
        role: 'USER'
      }
      const user = new User(userData)
      user.save()
        .then(() => {
          console.log('Saved')
          db.disconnect()
          return next()
        })
        .catch(err => {
          db.disconnect()
          return next(err)
        })
    })
}

module.exports.down = (next) => {
  base.connect()
    .then(db => {
      User.findOneAndRemove({ email: 'test@test.com' })
        .then(() => {
          console.log('Removed')
          db.disconnect()
          return next()
        })
        .catch(err => {
          db.disconnect()
          return next(err)
        })
    })
}
