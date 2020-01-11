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
      type: 'string'
    }
  },
  required: ['firstName', 'lastName', 'email', 'password']
}

module.exports = ajv.compile(userSchema)
