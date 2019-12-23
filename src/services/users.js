const uuidv4 = require('uuid/v4')
const pick = require('lodash/pick')
const CryptoJS = require('crypto-js')

const User = require('../models/user').User
const { createError, HttpError } = require('../services/error-handling/http.errors')

const usersFields = ['firstName', 'lastName', 'email', 'role', '_id']
const userFields = ['firstName', 'lastName', 'email', 'password', 'role', '_id']

function getUsers() {
    return new Promise((resolve, reject) => {
        User
            .find()
            .then(data => resolve(data.map(user => pick(user, usersFields))))
            .catch(error => reject(createError(error)))
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        User
            .findById(id)
            .then(data => resolve(pick(data, userFields)))
            .catch(error => reject(createError(error)))
    })
}

function getUserByToken(headers) {
    return new Promise((resolve, reject) => {
        User
          .findOne({apiKey: headers['x-api-key']})
          .then(data => resolve(pick(data, userFields)))
          .catch(error => reject(createError(error)))
    })
}

function loginUser(userData) {
    return new Promise((resolve, reject) => {
        User
            .findOneAndUpdate({email: userData.email}, {apiKey: uuidv4()}, {new: true})
            .then(data => {
                data ? resolve(data): reject(new HttpError('Incorrect login data', 401))
            })
            .catch(error => reject(createError(error)))
    })
}

function logoutUser (headers) {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ apiKey: headers['x-api-key'] }, {apiKey: uuidv4()})
          .then(data => resolve({message: 'Successful logout'}))
          .catch(error => reject(createError(error)))
    })
}

function createUser(userData) {
    return new Promise((resolve, reject) => {
        const user = new User(userData);
        user.save()
            .then(data => resolve(data))
            .catch(error => reject(createError(error)))
    })
}

function updateUser(id, userData) {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, userData, {new: true})
            .then(data => resolve(pick(data, userFields)))
            .catch(error => reject(createError(error)))
    })
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({_id: id})
            .then(data => resolve({message: 'User was deleted'}))
            .catch(error => reject(createError(error)))
    })
}

function encrypt(value) {
    return CryptoJS.AES.encrypt(value, 'Some key 12345').toString();
}

function decrypt(textToDecrypt) {
    return CryptoJS.AES.decrypt(textToDecrypt, 'Some key 12345').toString(CryptoJS.enc.Utf8);
}

module.exports.getUsers = getUsers
module.exports.getUser = getUser
module.exports.getUserByToken = getUserByToken
module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.logoutUser = logoutUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
