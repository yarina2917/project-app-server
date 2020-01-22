const ajv = require('ajv/lib/ajv')()

function generateUserValidator (type) {
  const schema = {
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
    }
  }

  if (type === 'create') {
    schema.required = ['firstName', 'lastName', 'email', 'password']
  } else {
    schema.properties.role = { type: 'string' }
  }

  return schema
}

module.exports.createUser = ajv.compile(generateUserValidator('create'))
module.exports.updateUser = ajv.compile(generateUserValidator('update'))
