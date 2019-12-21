const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { User } = require('../../models/user').User

passport.use('local', new LocalStrategy({
  emailField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({ email: email, password: password })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect login data' });
      }
      return done(null, user);
    })
    .catch(done)
}))


// module.exports = passport.authenticate(['api-key', 'local'], {session: false})
module.exports = passport.authenticate(['local'], {session: false})
