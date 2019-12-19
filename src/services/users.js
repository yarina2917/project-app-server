const atob = require('atob');
const uuidv4 = require('uuid/v4');

const User = require('../models/user').User
const { createError, HttpError } = require('../services/error-handling/http.errors')

function getUsers() {
    return new Promise((resolve, reject) => {
        User
            .find()
            .then(data => resolve(data))
            .catch(error => reject(createError(error)))
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        User
            .findById(id)
            .then(data => resolve(data))
            .catch(error => reject(createError(error)))
    })
}

function loginUser(userData, headers) {
    const data = atob(headers.authorization)
    // console.log(headers.authorization)
    return new Promise((resolve, reject) => {
        User
            .findOneAndUpdate(userData, {apiKey: uuidv4()}, {new: true})
            .then(data => {
                data ? resolve({token: data.apiKey}) :
                    reject(new HttpError('Wrong login data', 401))
            })
            .catch(error => reject(createError(error)))
    })
}

function logoutUser (id) {
    console.log('id', id)
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, {apiKey: uuidv4()})
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
            .then(data => resolve(data))
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

module.exports.getUsers = getUsers
module.exports.getUser = getUser
module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.logoutUser = logoutUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
