const uuid = require('uuid')
const pick = require('lodash/pick')

const User = require('../../models/user').User
const { createError } = require('../error-handling/http.errors')

const usersFields = ['firstName', 'lastName', 'email', 'role', '_id']
const userFields = ['firstName', 'lastName', 'email', 'password', 'role', '_id']

function getUsers () {
  return new Promise((resolve, reject) => {
    User
      .find()
      .then(data => resolve(data.map(user => pick(user, usersFields))))
      .catch(error => reject(createError(error)))
  })
}

function getUser (id) {
  return new Promise((resolve, reject) => {
    User
      .findById(id)
      .then(data => resolve(pick(data, userFields)))
      .catch(error => reject(createError(error)))
  })
}

function getUserByToken (headers) {
  return new Promise((resolve, reject) => {
    User
      .findOne({ apiKey: headers['x-api-key'] })
      .then(data => resolve(pick(data, userFields)))
      .catch(error => reject(createError(error)))
  })
}

function loginUser (userData) {
  return new Promise((resolve, reject) => {
    User
      .findOneAndUpdate({ email: userData.email }, { apiKey: uuid.v4() }, { new: true })
      .then(data => resolve(data))
      .catch(error => reject(createError(error)))
  })
}

function logoutUser (headers) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ apiKey: headers['x-api-key'] }, { apiKey: uuid.v4() })
      .then(() => resolve({ message: 'Success' }))
      .catch(error => reject(createError(error)))
  })
}

function createUser (userData) {
  return new Promise((resolve, reject) => {
    const user = new User(userData)
    user.save()
      .then(data => resolve(data))
      .catch(error => reject(createError(error)))
  })
}

function updateUser (id, userData) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, userData, { new: true })
      .then(data => resolve(pick(data, userFields)))
      .catch(error => reject(createError(error)))
  })
}

function deleteUser (id) {
  return new Promise((resolve, reject) => {
    User.findOneAndRemove({ _id: id })
      .then(() => resolve({ message: 'Success' }))
      .catch(error => reject(createError(error)))
  })
}

module.exports = {
  getUsers,
  getUser,
  getUserByToken,
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser
}
