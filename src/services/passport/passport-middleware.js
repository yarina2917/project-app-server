const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const CryptoJS = require('crypto-js')

const User = require('../../models/user').User

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({ email: email, password: password })
    .then((user) => {
      console.log(user)
      if (!user) {
        return done(null, false, { message: 'Incorrect login data' });
      }
      return done(null, user);
    })
    .catch(done)
}))


// module.exports = passport.authenticate(['api-key', 'local'], {session: false})
module.exports = passport.authenticate(['local'], {session: false})
