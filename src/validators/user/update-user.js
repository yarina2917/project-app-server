const ajv = require('ajv/lib/ajv')()

const userSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string',
      minLength: 5
    },
    role: {
      type: 'string'
    }
  }
}

module.exports = ajv.compile(userSchema)
