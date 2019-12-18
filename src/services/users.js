const User = require('../models/user').User
const { HttpError } = require('../services/error-handling/http.errors')

function getUsers() {
    return new Promise((resolve, reject) => {
        User
            .find()
            .then(data => resolve(data))
            .catch(error => reject(new HttpError(
                error.message || 'uncaught exception',
                error.status || 500
            )))
    })
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        User
            .findById(id)
            .then(data => resolve(data))
            .catch(error => reject(new HttpError(
                error.message || 'uncaught exception',
                error.status || 500
            )))
    })
}

function loginUser(userData) {
    return new Promise((resolve, reject) => {
        User
            .findOne(userData)
            .then(data => {
                data ? resolve({id: data._id}) :
                    reject(new HttpError('Wrong login data', 401))
            })
            .catch(error => reject(new HttpError(
                error.message || 'uncaught exception',
                error.status || 500
            )))
    })
}

function createUser(userData) {
    return new Promise((resolve, reject) => {
        const user = new User(userData);
        user.save()
            .then(data => resolve(data))
            .catch(error => reject(new HttpError(
                getErrorMessage(error), error.status || 500)
            ))
    })
}

function updateUser(id, userData) {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, userData, {new: true})
            .then(data => resolve(data))
            .catch(error => reject(new HttpError(
                getErrorMessage(error), error.status || 500)
            ))
    })

}

function getErrorMessage(error) {
    let errorMessage = error.message || 'uncaught exception';
    if (error.message && error.message.includes('duplicate')) {
        errorMessage = 'Email is already used'
    }
    return errorMessage
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        User.findOneAndRemove({_id: id})
            .then(data => resolve({message: 'User was deleted'}))
            .catch(error => reject(new HttpError(
                error.message || 'uncaught exception',
                error.status || 500
            )))
    })
}

module.exports.getUsers = getUsers
module.exports.getUser = getUser
module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
