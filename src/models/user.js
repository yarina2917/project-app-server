const mongoose = require('mongoose')
const uuid = require('uuid')

const roles = ['ADMIN', 'USER']
const adminRole = 'ADMIN'
const userRole = 'USER'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true,
    default: uuid.v4
  },
  role: {
    type: String,
    default: userRole,
    enum: roles,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const User = mongoose.model('User', userSchema)

module.exports.User = User
module.exports.roles = roles
module.exports.adminRole = adminRole
module.exports.userRole = userRole
