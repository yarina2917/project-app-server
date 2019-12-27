const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const CustomStrategy = require('passport-custom')

const User = require('../../models/user').User
const { decrypt } = require('../../services/utils/utils')

passport.use('api-key',
  new CustomStrategy((req, done) => {
    User.findOne({ apiKey: req.headers['x-api-key'] })
      .then(user => done(null, user))
      .catch(done)
  })
)

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user || decrypt(user.password) !== decrypt(password)) {
        return done({ message: 'Incorrect login data', status: 401 })
      }
      return done(null, user)
    })
    .catch(done)
}))


module.exports.apiKey = passport.authenticate(['api-key'], {session: false})
module.exports.local = passport.authenticate(['local'], {session: false})
