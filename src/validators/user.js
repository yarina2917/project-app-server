const ajv = require('ajv')();

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
        },
        role: {
            type: 'string',
        }
    },
    required: ['firstName', 'lastName', 'email'],
    additionalProperties: true
};

module.exports.validateUser = ajv.compile(userSchema)
