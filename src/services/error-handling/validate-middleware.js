const { HttpError } = require('./http.errors')

class ValidationError extends HttpError {
  constructor (errors, status = 400, message = 'Invalid data') {
    super(message)
    this.errors = errors
    this.status = status
    this.name = 'ValidationError'
  }
}

const validate = (validator) => (req, res, next) => {
  if (!validator(req.body)) {
    return next(new ValidationError(validator.errors))
  }
  next()
}

module.exports.validate = validate
