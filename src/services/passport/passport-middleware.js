const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../../models/user').User
const { decrypt } = require('../../services/users')

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user || decrypt(user.password) !== decrypt(password)) {
        return done(null, false, { message: 'Incorrect login data' });
      }
      return done(null, user);
    })
    .catch(done)
}))


// module.exports = passport.authenticate(['api-key', 'local'], {session: false})
module.exports = passport.authenticate(['local'], {session: false})
